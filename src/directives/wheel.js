class Wheel {
  constructor(element, callbacks = null, options = { prevent: false, stop: false }) {
    this.onWheelScroll = this.onWheelScroll.bind(this);

    this.element = element;
    this.callbacks = callbacks;
    this.preventEvent = options?.prevent;
    this.stopEvent = options?.stop;
    this.destroyed = false;

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener("wheel", this.onWheelScroll);
  }

  unbindEvents() {
    this.element.removeEventListener("wheel", this.onWheelScroll);
  }

  onWheelScroll(e) {
    this.callbacks?.wheel(e);

    if (this.preventEvent) {
      e.preventDefault();
    }

    if (this.stopEvent) {
      e.stopPropagation();
    }
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.unbindEvents();
      this.element = null;
      this.callbacks = null;
    }
  }
}

export default {
  mounted(el, { dir, value, modifiers }) {
    dir.wheel = new Wheel(el, value, modifiers);
  },
  beforeUnmount(el, { dir }) {
    if (dir.wheel) {
      dir.wheel.destroy();
      dir.wheel = null;
    }
  }
}
