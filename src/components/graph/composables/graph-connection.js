import { ref, watch, onMounted, nextTick, getCurrentInstance } from "vue";
import { Path } from "@svgdotjs/svg.js";
import isDefined from "@/utils/is-defined";

class GraphConnection {
  constructor({
    svg,
    id,
    from,
    to,
    invalidate,
    selected,
    emit,
    color,
    borderWidth,
    className,
    selectedClass,
    curveFactor
  }) {
    this.canvas = null;
    this.emit = emit;
    this.svg = svg;
    this.id = id.value ?? getCurrentInstance().uid;
    this.from = from;
    this.to = to;
    this.invalidate = ref(invalidate.value);
    this.selected = selected;
    this.color = color;
    this.borderWidth = borderWidth;
    this.className = className;
    this.selectedClass = selectedClass;
    this.curveFactor = curveFactor;
    this.svgElement = null;
    this.drawCache = null;

    this.onSelect = this.onSelect.bind(this);

    this.initWatchers({ invalidate })

    onMounted(() => {
      nextTick(() => {
        this.notifyRelink(null, this.from.value);
        this.notifyRelink(null, this.to.value);
        this.draw();
      })
    })
  }

  initWatchers({ invalidate }) {
    watch(invalidate, () => {
      this.invalidate.value = invalidate.value;
    });

    watch(this.invalidate, () => {
      this.emit("update:invalidate", this.invalidate.value);
      this.drawIfNeeded();
    })

    watch(this.from, (newVal, oldVal) => {
      this.notifyRelink(oldVal, newVal);
      this.invalidate.value = true;
    })

    watch(this.to, (newVal, oldVal) => {
      this.notifyRelink(oldVal, newVal);
      this.invalidate.value = true;
    })

    watch(this.curveFactor, () => {
      this.invalidate.value = true;
    })

    watch([this.color, this.borderWidth], () => {
      this.updateStyle();
    })

    watch(this.className, (newVal, oldVal) => {
      this.updateCssClass(oldVal, newVal);
    })

    watch(this.selectedClass, (newVal, oldVal) => {
      this.updateCssClass(oldVal, newVal);
    })

    watch(this.selected, () => {
      this.updateSelectedClass();
    })
  }

  onAdd(canvas) {
    this.canvas = canvas;
  }

  onRemove() {
    this.notifyUnlink(this.from.value);
    this.notifyUnlink(this.to.value);

    this.clearDrawCache();
    this.clearDraw();

    this.canvas = null;
    this.svg = null;
  }

  drawIfNeeded() {
    if (this.shouldDraw()) {
      this.draw();
    }
  }

  shouldDraw() {
    return this.invalidate.value;
  }

  draw(caching = false) {
    this.invalidate.value = false;
    const rootGroup = this.svg.rootGroup.value;
    if (!rootGroup) return;

    let from = null;
    let to = null;

    if (caching) {
      if (!this.drawCache) {
        this.drawCache = {
          from: this.findFromPort(),
          to: this.findToPort()
        }
      }

      from = this.drawCache.from;
      to = this.drawCache.to;
    } else {
      from = this.findFromPort();
      to = this.findToPort();
    }

    if (!from || !to) {
      this.clearDraw();
      return;
    }

    if (!this.svgElement) {
      this.svgElement = this.createSvgElement();
      rootGroup.add(this.svgElement);
    }

    this.update(from, to);
  }

  update(fromPort, toPort) {
    const p1 = fromPort.getAnchorCenterLayerPosition();
    const p2 = toPort.getAnchorCenterLayerPosition();

    const distance = p1.distanceTo(p2);

    const fromDirection = fromPort.getConnectionDirection();
    const toDirection = toPort.getConnectionDirection();

    const offsetX1 = this.getBezierHorizontalOffset(distance, fromDirection);
    const offsetY1 = this.getBezierVerticalOffset(distance, fromDirection);

    const offsetX2 = this.getBezierHorizontalOffset(distance, toDirection);
    const offsetY2 = this.getBezierVerticalOffset(distance, toDirection);

    const x1 = p1.x + offsetX1;
    const y1 = p1.y + offsetY1;
    const x2 = p2.x + offsetX2;
    const y2 = p2.y + offsetY2;

    const path = `M${p1.x} ${p1.y} C ${x1} ${y1}, ${x2} ${y2}, ${p2.x} ${p2.y}`;
    this.updatePath(path);
  }

  getBezierHorizontalOffset(distance, direction = null) {
    switch (direction) {
      case "left": return distance * -this.curveFactor.value;
      case "right": return distance * this.curveFactor.value;
      default: return 0;
    }
  }

  getBezierVerticalOffset(distance, direction = null) {
    switch (direction) {
      case "up": return distance * -this.curveFactor.value;
      case "down": return distance * this.curveFactor.value;
      default: return 0;
    }
  }

  updatePath(path) {
    this.svgElement?.attr("d", path);
  }

  clearDrawCache() {
    this.drawCache = null;
  }

  clearDraw() {
    if (this.svgElement) {
      this.svgElement.remove();
      this.svgElement = null;
    }
  }

  createSvgElement() {
    const path = new Path();
    path.addClass(this.className.value).click(this.onSelect);
    this.updateStyle(path);
    this.updateSelectedClass(path);
    return path;
  }

  updateStyle(svgElement = this.svgElement) {
    if (!svgElement) return;

    svgElement
      .stroke({
        width: this.borderWidth.value,
        color: this.color.value,
        linecap: "round"
      }).fill("transparent");
  }

  updateSelectedClass(svgElement = this.svgElement) {
    if (this.selected.value) {
      svgElement?.addClass(this.selectedClass.value);
    } else {
      svgElement?.removeClass(this.selectedClass.value);
    }
  }

  updateCssClass(oldCssClass, newCssClass) {
    if (oldCssClass) {
      this.srcElement?.removeClass(oldCssClass);
    }
    if (newCssClass) {
      this.srcElement?.addClass(newCssClass);
    }
  }

  onSelect(e) {
    this.stopEvent(e);
    this.emit("update:selected", true);
  }

  findFromPort() {
    return this.findPort(this.from.value);
  }

  findToPort() {
    return this.findPort(this.to.value);
  }

  findPort(target) {
    if (!target) return null;
    if (!this.canvas) return null;
    const node = this.canvas.getNode(target.nodeId);
    if (!node) return null;
    return node.getPort(target.portId);
  }

  targetEquals(target, otherTarget) {
    if (target === otherTarget) return true;
    if (!isDefined(target) || !isDefined(otherTarget)) return false;
    if (target.nodeId !== otherTarget.nodeId) return false;
    if (target.portId !== otherTarget.portId) return false;
    return true;
  }

  notifyRelink(oldTarget, newTarget) {
    this.notifyUnlink(oldTarget);
    this.notifyLink(newTarget);
  }

  notifyUnlink(target) {
    if (target) {
      this.notifyPort(target, "onUnlink");
    }
  }

  notifyLink(target) {
    if (target) {
      this.notifyPort(target, "onLink");
    }
  }

  notifyPort(target, method) {
    const port = this.findPort(target);
    port?.[method]?.(this);
  }

  stopEvent(e) {
    e.preventDefault();
    e.stopPropagation();
  }
}

export default GraphConnection;
