import portDirection from "./port-direction";
import { watch, ref, computed } from "vue";
import Point from "./point";

class GraphPort {
  constructor({
    name,
    inc,
    out,
    disabled,
    linkLimit,
    emit
  }) {
    this.node = null;
    this.emit = emit;
    this.name = name;
    this.disabled = disabled;
    this.linkLimit = linkLimit;
    this.anchor = ref(null);
    this.direction = ref(portDirection.Duplex);
    this.linkCount = ref(0);

    this.initComputed();
    this.initWatchers({ inc, out });
    this.updateDirection(inc.value, out.value);
  }

  initComputed() {
    this.linked = computed(() => this.linkCount.value > 0);
  }

  initWatchers({ inc, out }) {
    watch([inc, out], () => {
      this.updateDirection(inc.value, out.value);
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

  updateDirection(inc, out) {
    if (inc) {
      this.direction.value = portDirection.Incoming;
    } else if (out) {
      this.direction.value = portDirection.Outgoing;
    } else {
      this.direction.value = portDirection.Duplex;
    }
  }

  getConnections() {
    const target = this.makeTarget();
    if (!target || !this.node?.canvas) return [];
    return this.node?.canvas.findConnectionByTarget(target);
  }

  makeTarget() {
    if (!this.node) return null;
    return {
      nodeId: this.node.id,
      portName: this.name.value,
      direction: this.direction.value
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
}

export default GraphPort;
