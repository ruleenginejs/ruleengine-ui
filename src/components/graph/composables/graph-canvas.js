import { mac } from "@/utils/browser";
import isDefined from "@/utils/is-defined";
import { getWheelDelta } from "@/utils/wheel-delta";
import { ref, watch, computed, reactive, onMounted } from "vue"
import Bounds from "./bounds";
import clamp from "./clamp";
import EdgeScrolling from "./edge-scrolling";

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
    edgeSizes
  }) {
    this.emit = emit;
    this.nodes = {};

    this.container = ref(null);
    this.selectedNode = ref(null);

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
    this.onWheelScroll = this.onWheelScroll.bind(this);

    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };
    this.wheelCallbacks = { wheel: this.onWheelScroll };

    this.initComputed();
    this.initWatchers({ zoom, viewport });

    onMounted(() => {
      this.zoomChanged();
    })
  }

  initComputed() {
    this.selected = computed({
      get: () => !this.selectedNode.value,
      set: val => {
        if (val) {
          this.resetSelection();
        }
      }
    });

    this.scale = computed(() => this.zoom.value / 100);
    this.scaleStyle = computed(() => `scale(${this.scale.value})`);
    this.translateStyle = computed(() =>
      `translate(${this.layerPosition.x}px, ${this.layerPosition.y}px)`);
  }

  initWatchers({ zoom, viewport }) {
    watch(this.selectedNode, () => {
      this.emit("select", this.selectedNode.value);
    })

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
        this.nodes[data].move(deltaX, deltaY);
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

  addNode(id, node) {
    node.canvas = this;
    this.nodes[id] = node;
  }

  removeNode(id) {
    if (this.nodes[id]) {
      this.nodes[id].canvas = null;
      delete this.nodes[id];
    }
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

  isSelected(node) {
    return this.selectedNode.value === node;
  }

  select(node) {
    this.resetSelection();
    node.select();
    this.selectedNode.value = node;
  }

  deselect(node) {
    if (this.isSelected(node)) {
      node.deselect();
      this.selectedNode.value = null;
    }
  }

  resetSelection() {
    if (this.selectedNode.value) {
      this.selectedNode.value.deselect();
      this.selectedNode.value = null;
    }
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

  onDragStart(e) {
    this.moving.value = true;
    this.moveStartPoint.value = this.mouseEventToLayerPoint(e);
  }

  onDrag(e) {
    if (this.moving.value) {
      const { x, y } = this.mouseEventToLayerPoint(e);

      const deltaX = x - this.moveStartPoint.value.x;
      const deltaY = y - this.moveStartPoint.value.y;

      this.move(deltaX, deltaY);
    }
  }

  onDragEnd() {
    this.moving.value = false;
    this.moveStartPoint.value = null;

    this.onClickEnd();
  }

  onClickEnd() {
    this.selected.value = true;
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
}

export default GraphCanvas;
