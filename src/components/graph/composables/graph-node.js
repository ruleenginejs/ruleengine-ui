import { reactive, watch, ref, computed, getCurrentInstance } from "vue";
import Bounds from "./bounds";

class GraphNode {
  constructor(id, posX, posY, emit) {
    this.canvas = null;
    this.id = id.value ?? getCurrentInstance().uid;
    this.emit = emit;
    this.ports = [];

    this.position = reactive({ x: posX.value, y: posY.value });
    this.moving = ref(false);
    this.moveOffsetPoint = ref(null);
    this.zIndex = ref(1);
    this.container = ref(null);
    this.connectionCache = null;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };

    this.initComputed();
    this.initWatchers(posX, posY);
  }

  initComputed() {
    this.transformStyle = computed(() =>
      `translate(${this.position.x}px, ${this.position.y}px)`);
  }

  initWatchers(posX, posY) {
    watch([posX, posY], () => {
      this.position.x = posX.value;
      this.position.y = posY.value;
    })

    watch(this.position, () => {
      this.emit("update:x", this.position.x);
      this.emit("update:y", this.position.y);
    });
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
    this.ports.push(port);
    port.onAdd?.(this);
  }

  removePort(port) {
    const index = this.ports.indexOf(port);

    if (index > -1) {
      port.onRemove?.(this);
      this.ports.splice(index, 1);
    }
  }

  findPortBy(portName, direction) {
    return this.ports.filter(port =>
      port.name.value === portName && port.direction.value === direction
    )[0] ?? null;
  }

  getPortConnections() {
    const result = [];
    for (let i = 0; i < this.ports.length; i++) {
      result.push(...this.ports[i].getConnections());
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
    this.moving.value = false;
    this.moveOffsetPoint.value = null;

    this.canvas?.stopEdgeScrolling();
    this.clearConnectionCache();

    this.onClickEnd();
  }

  onEdgeScroll(deltaX, deltaY) {
    this.move(deltaX, deltaY);
    this.drawConnections(true);
  }

  onClickEnd() {
    this.emit("update:selected", true);
  }
}

export default GraphNode;
