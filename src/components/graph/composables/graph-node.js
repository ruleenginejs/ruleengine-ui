import { reactive, watch, ref, computed } from "vue";

class GraphNode {
  constructor(idVal, posX, posY, emit) {
    this.id = idVal;
    this.emit = emit;

    this.position = reactive({ x: posX.value, y: posY.value });
    this.selected = ref(false);
    this.moving = ref(false);
    this.moveOffsetPoint = ref(null);
    this.zIndex = ref(1);
    this.canvas = null;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };

    this.transformStyle = computed(() =>
      `translate(${this.position.x}px, ${this.position.y}px)`);

    this.initWatchers(posX, posY);
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

  select() {
    this.selected.value = true;
  }

  deselect() {
    this.selected.value = false;
  }

  moveTo(x, y) {
    this.position.x = x;
    this.position.y = y;
  }

  toFront() {
    this.canvas?.toFront(this);
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

    this.toFront();
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
    }
  }

  onDragEnd() {
    this.moving.value = false;
    this.moveOffsetPoint.value = null;

    this.onClickEnd();
  }

  onClickEnd() {
    this.select();
  }
}

export default GraphNode;
