import isDefined from "./is-defined";
import clamp from "./clamp";

class EdgeScrolling {
  constructor(options = {}, callbacks = null) {
    this.maxStep = options?.maxStep ?? 1;
    const edgeSize = options.edgeSize ?? { in: 1, out: 1 };

    this.edgeTopSize = options.edgeTopSize ?? edgeSize;
    this.edgeBottomSize = options.edgeBottomSize ?? edgeSize;
    this.edgeLeftSize = options.edgeLeftSize ?? edgeSize;
    this.edgeRightSize = options.edgeRightSize ?? edgeSize;

    this.isDestroyed = false;
    this.requestId = null;
    this.callbacks = callbacks;
  }

  update({ x, y }, data = null) {
    const outH = this.edgeLeftSize.out + this.edgeRightSize.out;
    const outV = this.edgeTopSize.out + this.edgeBottomSize.out;

    const viewportSize = this.callbacks?.onViewportSize();
    let viewportWidth = viewportSize?.x ?? 0;
    let viewportHeight = viewportSize?.y ?? 0;

    viewportWidth += outH;
    viewportHeight += outV;

    x += this.edgeLeftSize.out;
    y += this.edgeTopSize.out;

    const edgeTopSize = this.edgeTopSize.in + this.edgeTopSize.out;
    const edgeLeftSize = this.edgeLeftSize.in + this.edgeLeftSize.out;
    const edgeBottomSize = this.edgeBottomSize.in + this.edgeBottomSize.out;
    const edgeRightSize = this.edgeRightSize.in + this.edgeRightSize.out;

    const edgeTop = edgeTopSize;
    const edgeLeft = edgeLeftSize;
    const edgeBottom = viewportHeight - edgeBottomSize;
    const edgeRight = viewportWidth - edgeRightSize;

    x = clamp(0, x, viewportWidth);
    y = clamp(0, y, viewportHeight);

    const isInLeftEdge = (x < edgeLeft);
    const isInRightEdge = (x > edgeRight);
    const isInTopEdge = (y < edgeTop);
    const isInBottomEdge = (y > edgeBottom);

    if (!(isInLeftEdge || isInRightEdge || isInTopEdge || isInBottomEdge)) {
      this.stop();
      return;
    }

    const callback = () => {
      let deltaX, deltaY;

      deltaX = 0;
      deltaY = 0;

      if (isInLeftEdge) {
        const intensity = (edgeLeft - x) / edgeLeftSize;
        deltaX = -this.maxStep * intensity;

      } else if (isInRightEdge) {
        const intensity = (x - edgeRight) / edgeRightSize;
        deltaX = this.maxStep * intensity;
      }

      if (isInTopEdge) {
        const intensity = (edgeTop - y) / edgeTopSize;
        deltaY = -this.maxStep * intensity;

      } else if (isInBottomEdge) {
        const intensity = (y - edgeBottom) / edgeBottomSize;
        deltaY = this.maxStep * intensity;
      }

      this.callbacks?.onScroll({ deltaX, deltaY, data });
    };

    this.loop(callback);
  }

  loop(fn) {
    this.stop();
    const that = this;
    this.requestId = requestAnimationFrame(function loop() {
      fn();
      if (!that.isDestroyed) {
        that.requestId = requestAnimationFrame(loop);
      }
    });
  }

  stop() {
    if (isDefined(this.requestId)) {
      cancelAnimationFrame(this.requestId);
      this.requestId = null;
    }
  }

  destroy() {
    if (!this.isDestroyed) {
      this.isDestroyed = true;
      this.stop();
      this.callbacks = null;
    }
  }
}

export default EdgeScrolling;
