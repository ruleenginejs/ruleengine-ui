import { mac } from "@/utils/browser";
import isDefined from "@/utils/is-defined";
import { getWheelDelta } from "@/utils/wheel-delta";
import { ref, watch, computed, reactive, onMounted } from "vue"
import Bounds from "@/utils/bounds";
import clamp from "@/utils/clamp";
import Point from "@/utils/point";
import EdgeScrolling from "@/utils/edge-scrolling";

class GraphCanvas {
  constructor(emit, {
    viewport,
    zoom,
    minZoom,
    maxZoom,
    zoomSnap,
    zoomIntensity,
    moveIntensity,
    edgeMaxStep,
    edgeSizes,
    clickTolerance
  }) {
    this.emit = emit;
    this.nodes = {};
    this.connections = {};

    this.container = ref(null);
    this.size = reactive({ x: 0, y: 0 });

    this.minZoom = minZoom;
    this.maxZoom = maxZoom;
    this.zoomSnap = zoomSnap;
    this.zoomIntensity = zoomIntensity;
    this.zoom = ref(this.limitZoom(zoom.value));

    const viewportPoint = this.toPoint(viewport.value);
    this.layerPosition = reactive({ x: viewportPoint.x, y: viewportPoint.y });
    this.moving = ref(false);
    this.moveStartPoint = ref(null);
    this.moveIntensity = moveIntensity;

    this.clickStartPosition = ref(null);
    this.clickTolerance = clickTolerance;

    this.moveEdgeSize = ref(200);
    this.moveTimer = ref(null);
    this.moveStep = ref(50);

    this.minZIndex = ref(1);
    this.maxZIndex = ref(1000);
    this.lastZIndex = ref(this.minZIndex.value);

    this.edgeScrolling = this.makeEdgeSrolling(
      edgeMaxStep.value,
      edgeSizes.value
    );

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };

    this.onWheelScroll = this.onWheelScroll.bind(this);
    this.wheelCallbacks = { wheel: this.onWheelScroll };

    this.onResize = this.onResize.bind(this);
    this.resizeCallbacks = { resize: this.onResize };

    this.onSelect = () => { this.emit("update:selected", true); }

    this.initComputed();
    this.initWatchers({ zoom, viewport });

    onMounted(() => {
      this.zoomChanged();
      this.invalidateSize();
    })
  }

  initComputed() {
    this.scale = computed(() => this.zoom.value / 100);
    this.scaleStyle = computed(() => `scale(${this.scale.value})`);
    this.translateStyle = computed(() =>
      `translate(${this.layerPosition.x}px, ${this.layerPosition.y}px)`);
  }

  initWatchers({ zoom, viewport }) {
    watch(zoom, () => {
      this.setZoom(zoom.value);
    })

    watch(viewport, () => {
      this.setView(this.toPoint(viewport.value))
    })

    watch(this.layerPosition, () => {
      const { x, y } = this.layerPosition;
      this.emit("update:viewport", [x, y]);
    })
  }

  makeEdgeSrolling(maxStep, edgeSizes) {
    const defaultEdgeSizes = {
      edgeTopSize: { in: 0, out: 20 },
      edgeBottomSize: { in: 0, out: 20 },
      edgeLeftSize: { in: 0, out: 20 },
      edgeRightSize: { in: 0, out: 20 },
      ...edgeSizes
    }

    const options = {
      maxStep,
      ...defaultEdgeSizes
    };

    const callbacks = {
      onViewportSize: () => this.getContainerSize(),
      onScroll: ({ deltaX, deltaY, data }) => {
        this.move(-deltaX, -deltaY);
        this.nodes[data].onEdgeScroll?.(deltaX, deltaY);
      }
    }

    return new EdgeScrolling(options, callbacks);
  }

  zoomChanged() {
    this.emit("update:zoom", this.zoom.value);
  }

  getContainerSize() {
    const size = this.container.value?.getBoundingClientRect();
    return {
      x: size?.width ?? 0,
      y: size?.height ?? 0
    }
  }

  invalidateSize() {
    const { x, y } = this.getContainerSize();
    this.size.x = x;
    this.size.y = y;
  }

  getContainerCenter() {
    const { x, y } = this.getContainerSize();
    return {
      x: x / 2,
      y: y / 2
    }
  }

  getContainerBounds() {
    return new Bounds(
      this.layerPosition,
      this.addPoint(this.layerPosition, this.getContainerSize())
    );
  }

  toPoint(value) {
    return Array.isArray(value)
      ? { x: value[0], y: value[1] }
      : null;
  }

  point(x = 0, y = 0) {
    return { x, y };
  }

  subtractPoint(pointA, pointB) {
    return { x: pointA.x - pointB.x, y: pointA.y - pointB.y };
  }

  addPoint(pointA, pointB) {
    return { x: pointA.x + pointB.x, y: pointA.y + pointB.y };
  }

  multiplyPointBy(point, num) {
    return { x: point.x * num, y: point.y * num };
  }

  dividePointBy(point, num) {
    return { x: point.x / num, y: point.y / num };
  }

  addNode(node) {
    this.nodes[node.id] = node;
    node.onAdd?.(this);
  }

  removeNode(id) {
    if (this.nodes[id]) {
      this.nodes[id].onRemove?.(this);
      delete this.nodes[id];
    }
  }

  getNode(nodeId) {
    return this.nodes[nodeId] ?? null;
  }

  getNodes() {
    return Object.keys(this.nodes)
      .map(key => this.nodes[key]);
  }

  getNodeBounds() {
    const nodes = this.getNodes();
    if (nodes.length === 0) {
      return new Bounds(this.point(), this.point())
    }

    return nodes.reduce((res, node) => {
      const { min, max } = node.getBounds();
      return res.extend(min).extend(max);
    }, new Bounds());
  }

  addConnection(connection) {
    this.connections[connection.id] = connection;
    connection.onAdd?.(this);
  }

  removeConnection(connection) {
    if (this.connections[connection.id]) {
      connection.onRemove?.(this);
      delete this.connections[connection.id];
    }
  }

  getConnection(connectionId) {
    return this.connections[connectionId] ?? null;
  }

  findConnectionsByTarget(target) {
    const result = [];
    for (let key in this.connections) {
      const connection = this.connections[key];
      if (connection.targetEquals(connection.from.value, target)
        || connection.targetEquals(connection.to.value, target)) {
        result.push(connection);
      }
    }
    return result;
  }

  bringToFront(node) {
    this.tryResetZIndex();
    node.zIndex.value = ++this.lastZIndex.value;
  }

  tryResetZIndex() {
    if (this.lastZIndex.value >= this.maxZIndex.value) {
      for (let key in this.nodes) {
        this.nodes[key].zIndex.value = this.minZIndex.value;
      }
      this.lastZIndex.value = this.minZIndex.value;
    }
  }

  containerPointToLayerPoint({ x, y }) {
    return {
      x: x / this.scale.value - this.layerPosition.x,
      y: y / this.scale.value - this.layerPosition.y
    }
  }

  layerPointToContainerPoint({ x, y }) {
    return {
      x: (x + this.layerPosition.x) * this.scale.value,
      y: (y + this.layerPosition.y) * this.scale.value
    };
  }

  mouseEventToLayerPoint(e) {
    return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(e));
  }

  mouseEventToContainerPoint(e) {
    return this.getMousePosition(e, this.container.value);
  }

  getCenterLayerPoint() {
    return this.containerPointToLayerPoint(this.getContainerCenter());
  }

  getCenterLayerOffset({ x, y }) {
    const centerPoint = this.getCenterLayerPoint();
    return {
      x: x - centerPoint.x,
      y: y - centerPoint.y
    }
  }

  getMousePosition(e, container = null) {
    if (!container) {
      return {
        x: e.clientX,
        y: e.clientY
      }
    }

    const offset = container.getBoundingClientRect();

    return {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    }
  }

  move(deltaX, deltaY) {
    this.layerPosition.x += deltaX;
    this.layerPosition.y += deltaY;
  }

  moveTo(x, y) {
    this.layerPosition.x = x;
    this.layerPosition.y = y;
  }

  setZoom(zoom) {
    const oldCenter = this.getCenterLayerPoint();
    this.zoom.value = this.limitZoom(zoom);
    const newCenter = this.getCenterLayerPoint();
    const offset = this.subtractPoint(newCenter, oldCenter);
    this.move(offset.x, offset.y);
    this.zoomChanged();
    return this;
  }

  setZoomAround(point, zoom) {
    const containerPoint = this.layerPointToContainerPoint(point);
    this.zoom.value = this.limitZoom(zoom);
    const newPoint = this.containerPointToLayerPoint(containerPoint);
    const offset = this.subtractPoint(newPoint, point);
    this.move(offset.x, offset.y);
    this.zoomChanged();
    return this;
  }

  getZoomScale(toZoom, fromZoom = null) {
    fromZoom = !isDefined(fromZoom) ? this.zoom.value : fromZoom;
    return toZoom / fromZoom;
  }

  getScaleZoom(scale) {
    return scale * 100;
  }

  setView({ x, y }) {
    this.moveTo(x, y);
    return this;
  }

  setCenter({ x, y }, zoom = null) {
    this.moveTo(x, y);
    this.zoom.value = isDefined(zoom) ? this.limitZoom(zoom) : this.zoom.value;
    const center = this.getCenterLayerPoint();
    const centerOffset = this.subtractPoint(center, this.layerPosition);
    this.move(centerOffset.x, centerOffset.y);
    this.zoomChanged();
  }

  limitZoom(zoom) {
    if (this.zoomSnap.value) {
      zoom = Math.round(zoom / this.zoomSnap.value) * this.zoomSnap.value;
    }
    return clamp(this.minZoom.value, zoom, this.maxZoom.value);
  }

  performZoom(point, delta) {
    const zoom = this.zoom.value + (delta * this.zoomIntensity.value);
    this.setZoomAround(point, zoom);
  }

  fitBounds(bounds) {
    const { center, zoom } = this.getBoundsCenterZoom(bounds);
    this.setCenter(center, zoom);
  }

  getBoundsCenterZoom(bounds) {
    const zoom = this.getBoundsZoom(bounds);
    return { center: bounds.getCenter(), zoom };
  }

  getBoundsZoom(bounds) {
    const size = this.getContainerSize();
    const boundsSize = bounds.getSize();
    const scaleX = size.x / boundsSize.x;
    const scaleY = size.y / boundsSize.y;
    const scale = Math.min(scaleX, scaleY);
    return this.limitZoom(this.getScaleZoom(scale));
  }

  isClickValid(newPosition) {
    return newPosition.distanceTo(this.clickStartPosition.value) <= this.clickTolerance.value;
  }

  onDragStart(e) {
    this.moving.value = true;
    this.moveStartPoint.value = this.mouseEventToLayerPoint(e);
    this.clickStartPosition.value = Point.toPoint(e.clientX, e.clientY);
  }

  onDrag(e) {
    if (this.moving.value) {
      const { x, y } = this.mouseEventToLayerPoint(e);

      const deltaX = x - this.moveStartPoint.value.x;
      const deltaY = y - this.moveStartPoint.value.y;

      this.move(deltaX, deltaY);
    }
  }

  onDragEnd(e) {
    this.moving.value = false;
    this.moveStartPoint.value = null;
    this.handleClick(e);
  }

  onWheelScroll(e) {
    if (mac && Number.isInteger(e.deltaY)) {
      this.onWheelMove(e);
      return;
    }

    const delta = getWheelDelta(e);
    const point = this.mouseEventToLayerPoint(e);

    this.performZoom(point, delta);
  }

  onWheelMove(e) {
    let { deltaX, deltaY } = e;
    const moveIntensity = this.moveIntensity.value;
    const offsetX = -deltaX * moveIntensity / this.scale.value;
    const offsetY = -deltaY * moveIntensity / this.scale.value;
    this.move(offsetX, offsetY);
  }

  updateEdgeScrolling(e, data = null) {
    const point = this.mouseEventToContainerPoint(e);
    this.edgeScrolling.update(point, data);
  }

  stopEdgeScrolling() {
    this.edgeScrolling.stop();
  }

  onResize() {
    this.invalidateSize();
  }

  handleClick(e) {
    const newPosition = Point.toPoint(e.clientX, e.clientY);
    if (this.isClickValid(newPosition)) {
      this.onClick(e);
    }
    this.clickStartPosition.value = null;
  }

  onClick(e) {
    this.onSelect(e);
  }
}

export default GraphCanvas;
