import { ref, computed, getCurrentInstance, reactive, watch } from "vue";
import Point from "@/utils/point";
import isDefined from "@/utils/is-defined";

class GraphPort {
  constructor({
    id,
    disabled,
    linkLimit,
    linkRule,
    emit
  }) {
    this.node = null;
    this.emit = emit;
    this.id = id.value ?? getCurrentInstance().uid;
    this.disabled = disabled;
    this.linkLimit = linkLimit;
    this.anchor = ref(null);
    this.linkCount = ref(0);
    this.linkStart = ref(false);
    this.linkEnter = ref(false);
    this.linkRule = linkRule;

    this.initComputed();
    this.initWatchers();
    this.initLinkOptions();
    this.initLinkTargetOptions();
  }

  initComputed() {
    this.linked = computed(() => this.linkCount.value > 0);

    this.linkEnabled = computed(() => {
      if (this.disabled.value) return false;
      if (isDefined(this.linkLimit.value)
        && this.linkCount.value >= this.linkLimit.value) return false;
      return true;
    })
  }

  initWatchers() {
    watch(this.linkEnabled, () => {
      this.linkOptions.enabled = this.linkEnabled.value;
      this.linkTargetOptions.enabled = this.linkEnabled.value
    });
  }

  initLinkOptions() {
    this.linkOptions = reactive({
      start: () => this.linkStart.value = true,
      end: () => this.linkStart.value = false,
      data: () => this.makeTarget(),
      enabled: this.linkEnabled.value,
      snapToCenter: true
    });
  }

  initLinkTargetOptions() {
    this.linkTargetOptions = reactive({
      enter: () => this.linkEnter.value = true,
      leave: () => this.linkEnter.value = false,
      link: (e) => {
        this.linkEnter.value = false;
        this.emit("new-link", {
          ...e,
          from: e.data,
          to: this.makeTarget()
        })
      },
      rule: () => this.linkRule.value?.(),
      enabled: this.linkEnabled.value,
      snapToCenter: true
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
}

export default GraphPort;
