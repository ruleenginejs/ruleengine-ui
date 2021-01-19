import { reactive, watch, ref, computed, getCurrentInstance } from "vue";
import Bounds from "./bounds";

class GraphNode {
  constructor(id, posX, posY, emit) {
    this.canvas = null;
    this.id = id.value ?? getCurrentInstance().uid;
    this.emit = emit;
    this.ports = [];

    this.position = reactive({ x: posX.value, y: posY.value });
    this.selected = ref(false);
    this.moving = ref(false);
    this.moveOffsetPoint = ref(null);
    this.zIndex = ref(1);
    this.container = ref(null);

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

    watch(this.selected, () => {
      this.updateSelection();
    })
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

  select() {
    this.selected.value = true;
  }

  deselect() {
    this.selected.value = false;
  }

  updateSelection() {
    if (this.selected.value) {
      this.canvas?.select(this);
    } else {
      this.canvas?.deselect(this);
    }
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

  onAdd(canvas) {
    this.canvas = canvas;
    this.updateSelection();
  }

  onRemove() {
    this.canvas?.deselect(this);
    this.canvas = null;
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
    }
  }

  onDragEnd() {
    this.moving.value = false;
    this.moveOffsetPoint.value = null;

    this.canvas?.stopEdgeScrolling();
    this.onClickEnd();
  }

  onClickEnd() {
    this.select();
  }
}

export default GraphNode;
