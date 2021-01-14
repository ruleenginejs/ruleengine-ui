import { reactive, watch, ref, computed } from "vue";

class GraphNode {
  constructor(idVal, posX, posY, emit) {
    this.id = idVal;
    this.emit = emit;

    this.position = reactive({
      x: posX.value,
      y: posY.value
    });

    this.selected = ref(false);

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

  onDragStart() {

  }

  onDrag() {

  }

  onDragEnd() {
    this.select();
  }
}

export default GraphNode;
