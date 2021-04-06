import { reactive, watch, ref, computed, getCurrentInstance } from "vue";
import Bounds from "@/utils/bounds";

class GraphNode {
  constructor({
    id,
    x,
    y,
    emit,
    linkRule
  }) {
    this.canvas = null;
    this.id = id.value ?? getCurrentInstance().uid;
    this.emit = emit;
    this.ports = {};

    this.position = reactive({ x: x.value, y: y.value });
    this.moving = ref(false);
    this.moveOffsetPoint = ref(null);
    this.zIndex = ref(1);
    this.container = ref(null);
    this.connectionCache = null;
    this.linkEnter = ref(false);
    this.linkRule = linkRule;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };

    this.onSelect = () => { this.emit("update:selected", true); }

    this.initComputed();
    this.initWatchers(x, y);

    this.initLinkOptions();
    this.initLinkTargetOptions();
  }

  initComputed() {
    this.transformStyle = computed(() =>
      `translate(${this.position.x}px, ${this.position.y}px)`);
  }

  initWatchers(x, y) {
    watch([x, y], () => {
      this.position.x = x.value;
      this.position.y = y.value;
    })

    watch(this.position, () => {
      this.emit("update:x", this.position.x);
      this.emit("update:y", this.position.y);
    });
  }

  initLinkOptions() {
    this.linkOptions = reactive({
      data: () => this.makeTarget()
    });
  }

  initLinkTargetOptions() {
    const end = () => this.linkEnter.value = false;

    this.linkTargetOptions = reactive({
      enter: () => this.linkEnter.value = true,
      leave: end,
      finish: end,
      link: (e) => { end(); this.emitNewLink(e); },
      rule: (e) => this.linkRule.value?.(e, this.makeTarget()),
      snapToCenter: false
    });
  }

  emitNewLink(e) {
    this.emit("new-link", {
      ...e,
      from: e.data,
      to: this.makeTarget()
    })
  }

  makeTarget() {
    return { nodeId: this.id, portId: null };
  }

  onAdd(canvas) {
    this.canvas = canvas;
  }

  onRemove() {
    this.clearConnectionCache();
    this.canvas = null;
  }

  getSize() {
    const size = this.container.value?.getBoundingClientRect();
    const scale = this.canvas?.scale.value ?? 0;
    return {
      x: (size?.width ?? 0) / scale,
      y: (size?.height ?? 0) / scale
    }
  }

  getBounds() {
    return new Bounds(
      this.position,
      this.addPoint(this.position, this.getSize())
    );
  }

  clonePoint({ x, y }) {
    return { x, y };
  }

  addPoint(pointA, pointB) {
    return { x: pointA.x + pointB.x, y: pointA.y + pointB.y };
  }

  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  move(deltaX, deltaY) {
    this.position.x += deltaX;
    this.position.y += deltaY;
  }

  bringToFront() {
    this.canvas?.bringToFront(this);
  }

  addPort(port) {
    this.ports[port.id] = port;
    port.onAdd?.(this);
  }

  removePort(port) {
    if (this.ports[port.id]) {
      port.onRemove?.(this);
      delete this.ports[port.id];
    }
  }

  getPort(portId) {
    return this.ports[portId] ?? null;
  }

  getPorts() {
    return Object.keys(this.ports).map(key => this.ports[key]);
  }

  getPortConnections() {
    const result = [];
    for (let key in this.ports) {
      result.push(...this.ports[key].getConnections());
    }
    return result;
  }

  drawConnections(caching = false) {
    let connections;
    if (caching) {
      if (!this.connectionCache) {
        this.connectionCache = this.getPortConnections();
      }
      connections = this.connectionCache;
    } else {
      connections = this.getPortConnections();
    }

    for (let i = 0; i < connections.length; i++) {
      connections[i].draw(caching);
    }
  }

  clearConnectionCache() {
    if (this.connectionCache) {
      this.connectionCache.forEach(c => {
        c.clearDrawCache();
      });
      this.connectionCache = null;
    }
  }

  onDragStart(e) {
    this.moving.value = true;
    const startPoint = this.canvas?.mouseEventToLayerPoint(e);

    if (startPoint) {
      this.moveOffsetPoint.value = {
        x: startPoint.x - this.position.x,
        y: startPoint.y - this.position.y
      }
    }

    this.bringToFront();
  }

  onDrag(e) {
    if (this.moving.value) {
      const movingPoint = this.canvas?.mouseEventToLayerPoint(e);
      const offsetPoint = this.moveOffsetPoint.value;

      if (movingPoint && offsetPoint) {
        this.moveTo(
          movingPoint.x - offsetPoint.x,
          movingPoint.y - offsetPoint.y
        );
      }

      this.canvas?.updateEdgeScrolling(e, this.id);
      this.drawConnections(true);
    }
  }

  onDragEnd() {
    this.drawConnections(true);

    this.moving.value = false;
    this.moveOffsetPoint.value = null;

    this.canvas?.stopEdgeScrolling();
    this.clearConnectionCache();
  }

  onEdgeScroll(deltaX, deltaY) {
    this.move(deltaX, deltaY);
    this.drawConnections(true);
  }
}

export default GraphNode;
