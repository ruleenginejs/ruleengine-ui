import { ref, watch, onMounted } from "vue";
import portDirection from "./port-direction";
import { Line } from "@svgdotjs/svg.js";

class GraphConnection {
  constructor({
    svg,
    from,
    to,
    invalidate,
    emit
  }) {
    this.canvas = null;
    this.emit = emit;
    this.svg = svg;
    this.from = ref(this.parseTarget(from.value));
    this.to = ref(this.parseTarget(to.value));
    this.invalidate = ref(invalidate.value);
    this.svgElement = null;
    this.cache = null;

    this.initWatchers({ invalidate, svg, from, to })

    onMounted(() => {
      this.draw();
    })
  }

  initWatchers({ invalidate, svg, from, to }) {
    watch(invalidate, () => {
      this.invalidate.value = invalidate.value;
    });

    watch(this.invalidate, () => {
      this.emit("update:invalidate", this.invalidate.value);
      this.drawIfNeeded();
    })

    watch(from, () => {
      this.from.value = this.parseTarget(from.value);
    })

    watch(to, () => {
      this.to.value = this.parseTarget(to.value);
    })

    watch(this.from, () => {
      this.invalidate.value = true;
    })

    watch(this.to, () => {
      this.invalidate.value = true;
    })

    watch(svg.rootGroup, () => {
      this.draw();
    })
  }

  onAdd(canvas) {
    this.canvas = canvas;
  }

  onRemove() {
    this.canvas = null;
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
      if (!this.cache) {
        this.cache = {
          from: this.findFromPort(),
          to: this.findToPort()
        }
      }

      from = this.cache.from;
      to = this.cache.to;
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
    this.svgElement
      .attr('x1', p1.x)
      .attr('y1', p1.y)
      .attr('x2', p2.x)
      .attr('y2', p2.y);
  }

  clearCache() {
    this.cache = null;
  }

  clearDraw() {
    if (this.svgElement) {
      this.svgElement.remove();
      this.svgElement = null;
    }
  }

  createSvgElement() {
    const line = new Line(0, 0, 0, 0);
    line.stroke({ color: "#414141", width: 3, linecap: "round" });
    return line;
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
    const node = this.canvas.nodes[target.nodeId];
    if (!node) return null;
    return node.findPortBy(target.portName, target.direction);
  }

  parseTarget(target) {
    let [nodeId, portName, direction] = (target || "").split(":");
    if (!nodeId || !portName) return null;
    direction = direction === "in"
      ? portDirection.Incoming
      : (direction === "out" ? portDirection.Outgoing : portDirection.Duplex);
    return { nodeId, portName, direction };
  }
}

export default GraphConnection;