import { ref, computed, getCurrentInstance, reactive, watch } from "vue";
import Point from "@/utils/point";

class GraphPort {
  constructor({
    id,
    disabled,
    linkLimit,
    emit
  }) {
    this.node = null;
    this.emit = emit;
    this.id = id.value ?? getCurrentInstance().uid;
    this.disabled = disabled;
    this.linkLimit = linkLimit;
    this.anchor = ref(null);
    this.linkCount = ref(0);
    this.linking = ref(false);

    this.onLinkStart = this.onLinkStart.bind(this);
    this.onLinkEnd = this.onLinkEnd.bind(this);
    this.onLinkData = this.onLinkData.bind(this);

    this.linkOptions = reactive({
      start: this.onLinkStart,
      end: this.onLinkEnd,
      data: this.onLinkData,
      enabled: !disabled.value
    });

    this.initComputed();
    this.initWatchers({ disabled });
  }

  initComputed() {
    this.linked = computed(() => this.linkCount.value > 0);
  }

  initWatchers({ disabled }) {
    watch(disabled, () => {
      debugger;
      this.linkOptions.enabled = !disabled.value;
    });
  }

  onAdd(node) {
    this.node = node;
  }

  onRemove() {
    this.node = null;
  }

  onLink(connection) {
    this.incrLinkCount();
    this.emit("link", { port: this, connection });
  }

  onUnlink(connection) {
    this.decrLinkCount();
    this.emit("unlink", { port: this, connection });
  }

  incrLinkCount() {
    this.linkCount.value++;
  }

  decrLinkCount() {
    this.linkCount.value--;
    if (this.linkCount.value < 0) {
      this.linkCount.value = 0;
    }
  }

  getConnections() {
    const target = this.makeTarget();
    if (!target || !this.node?.canvas) return [];
    return this.node?.canvas.findConnectionsByTarget(target);
  }

  makeTarget() {
    if (!this.node) return null;
    return {
      nodeId: this.node.id,
      portId: this.id,
    }
  }

  getAnchorCenterLayerPosition() {
    const rect = this.anchor.value?.getBoundingClientRect();
    const canvas = this.node?.canvas;
    if (!rect || !canvas) return { x: 0, y: 0 };
    const pos = Point.toPoint(canvas.mouseEventToLayerPoint({
      clientX: rect.left,
      clientY: rect.top
    }));
    const size = (new Point(rect.width, rect.height)).divideBy(canvas.scale.value);
    const halfSize = size.divideBy(2);
    return pos.add(halfSize);
  }

  onLinkStart() {
    this.linking.value = true;
  }

  onLinkEnd() {
    debugger;
    this.linking.value = false;
  }

  onLinkData() {
    debugger;
    return this.makeTarget();
  }
}

export default GraphPort;
