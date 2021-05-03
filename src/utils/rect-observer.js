import { isDefined } from "./types";

class RectObserver {
  constructor(element, callback, customEquals = null, checkInterval = 100) {
    this.element = element;
    this.checkInterval = checkInterval;
    this.timer = null;
    this.lastRect = null;
    this.callback = callback;
    this.equalsRectFn = customEquals ?? this.equalsRect;
    this.doCheck = this.doCheck.bind(this);
  }

  start() {
    if (!this.timer) {
      this.timer = setInterval(this.doCheck, this.checkInterval);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.lastRect = null;
  }

  doCheck() {
    const currentRect = this.element.getBoundingClientRect();
    if (!this.lastRect) {
      this.lastRect = currentRect;
      return;
    }
    if (this.equalsRectFn(this.lastRect, currentRect)) {
      return;
    }
    this.callback?.(currentRect);
    this.lastRect = currentRect;
  }

  equalsRect(rect1, rect2) {
    return isDefined(rect1)
      && isDefined(rect2)
      && rect1.left === rect2.left
      && rect1.top === rect2.top
      && rect1.width === rect2.width
      && rect1.height === rect2.height
  }

  destroy() {
    this.stop();
    this.element = null;
    this.callback = null;
  }
}

export default RectObserver;
