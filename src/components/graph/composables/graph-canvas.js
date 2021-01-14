import { ref, watch, computed } from "vue"

class GraphCanvas {
  constructor(emit) {
    this.emit = emit;
    this.nodes = {};

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };

    this.selectedNode = ref(null);

    this.selected = computed({
      get: () => !this.selectedNode.value,
      set: val => {
        if (val) {
          this.resetSelection();
        }
      }
    });

    this.initWatchers();
  }

  initWatchers() {
    watch(this.selectedNode, () => {
      this.emit("select", this.selectedNode.value);
    })
  }

  addNode(id, node) {
    this.nodes[id] = node;
  }

  removeNode(id) {
    if (this.nodes[id]) {
      delete this.nodes[id];
    }
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

  onDragStart() {

  }

  onDrag() {

  }

  onDragEnd() {
    this.selected.value = true;
  }
}

export default GraphCanvas;
