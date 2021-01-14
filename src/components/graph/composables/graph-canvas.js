import { ref, watch, computed, reactive } from "vue"
import clamp from "./clamp";

class GraphCanvas {
  constructor(emit) {
    this.emit = emit;
    this.nodes = {};

    this.container = ref(null);
    this.selectedNode = ref(null);

    this.scale = ref(1);
    this.minScale = ref(0.1);
    this.maxScale = ref(2);

    this.layerPosition = reactive({ x: 0, y: 0 });
    this.moving = ref(false);
    this.moveStartPoint = ref(null);

    this.minZIndex = ref(1);
    this.maxZIndex = ref(1000);
    this.lastZIndex = ref(this.minZIndex.value);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.draggableCallbacks = {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd
    };

    this.selected = computed({
      get: () => !this.selectedNode.value,
      set: val => {
        if (val) {
          this.resetSelection();
        }
      }
    });

    this.computedScale = computed(() =>
      clamp(this.minScale.value, this.scale.value, this.maxScale.value));

    this.layerTransformStyle = computed(() =>
      `translate(${this.layerPosition.x}px, ${this.layerPosition.y}px) scale(${this.computedScale.value})`);

    this.initWatchers();
  }

  initWatchers() {
    watch(this.selectedNode, () => {
      this.emit("select", this.selectedNode.value);
    })
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

  toFront(node) {
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
}

export default GraphCanvas;
