import debounce from "debounce";

class Resizing {
  constructor(element, callbacks = null, delay = null) {
    this.element = element;
    this.callbacks = callbacks;
    this.destroyed = false;

    this.onResize = this.onResize.bind(this);
    this.resizeHandler = debounce(this.onResize, delay ?? 300);

    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener("resize", this.resizeHandler);
  }

  unbindEvents() {
    window.removeEventListener("resize", this.resizeHandler);
  }

  onResize(e) {
    this.callbacks?.resize(e);
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

const PROP = Symbol("resize");

export default {
  mounted(el, { value }) {
    el[PROP] = new Resizing(el, value);
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}