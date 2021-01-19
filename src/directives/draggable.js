class Draggable {
  constructor(element, callbacks = null, stopEvent = false) {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.element = element;
    this.callbacks = callbacks;
    this.stopEvent = stopEvent;
    this.dragging = false;
    this.destroyed = false;

    this.bindMouseDown();
  }

  bindMouseDown() {
    this.element.addEventListener("mousedown", this.onMouseDown);
  }

  unbindMouseDown() {
    this.element.removeEventListener("mousedown", this.onMouseDown);
  }

  bindEvents() {
    document.addEventListener("mousemove", this.onMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  unbindEvents() {
    document.removeEventListener("mousemove", this.onMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  isRightMouseButton(e) {
    return "button" in e && e.button !== 0;
  }

  onMouseDown(e) {
    if (this.isRightMouseButton(e)) {
      return;
    }

    if (!this.dragging) {
      this.callbacks?.dragStart(e);
    }

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }

    this.dragging = true;
    this.bindEvents();
  }

  onMove(e) {
    if (!this.dragging) {
      return;
    }

    this.callbacks?.drag(e);
  }

  onMouseUp(e) {
    if (this.dragging) {
      this.callbacks?.dragEnd(e);
    }

    this.dragging = false;
    this.unbindEvents()
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.unbindMouseDown();

      if (this.dragging) {
        this.unbindEvents();
      }

      this.element = null;
      this.callbacks = null;
    }
  }
}

const PROP = "$_v_draggable";

export default {
  mounted(el, { value, modifiers }) {
    el[PROP] = new Draggable(el, value, !!modifiers.stop);
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}
