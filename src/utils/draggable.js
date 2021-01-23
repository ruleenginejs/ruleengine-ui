import isDefined from "./is-defined";

class Draggable {
  static activeDraggable = null;
  static activeDroppables = [];

  constructor(element, callbacks = null, stopEvent = false, ctrl = null) {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onPrevent = this.onPrevent.bind(this);

    this.element = element;
    this.callbacks = callbacks;
    this.stopEvent = stopEvent;
    this.dragging = false;
    this.destroyed = false;
    this.ctrl = ctrl;

    this.bindMouseDown();

    if (this.ctrl) {
      this.bindContextMenu();
    }
  }

  bindMouseDown() {
    this.element.addEventListener("mousedown", this.onMouseDown);
  }

  unbindMouseDown() {
    this.element.removeEventListener("mousedown", this.onMouseDown);
  }

  bindContextMenu() {
    this.element.addEventListener("contextmenu", this.onPrevent);
  }

  unbindContextMenu() {
    this.element.removeEventListener("contextmenu", this.onPrevent);
  }

  bindEvents() {
    document.addEventListener("mousemove", this.onMove);
    document.addEventListener("mouseup", this.onMouseUp);
  }

  unbindEvents() {
    document.removeEventListener("mousemove", this.onMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }

  activate() {
    Draggable.activeDraggable = this;
  }

  deactivate() {
    if (Draggable.activeDraggable === this) {
      Draggable.activeDraggable = null;
    }
  }

  getData() {
    return this.callbacks?.data?.();
  }

  isRightMouseButton(e) {
    return "button" in e && e.button !== 0;
  }

  checkCtrl(e) {
    if (!isDefined(this.ctrl)) return true;
    if (this.ctrl) return e.ctrlKey;
    else return !e.ctrlKey;
  }

  onMouseDown(e) {
    if (this.isRightMouseButton(e)) {
      return;
    }

    if (!this.checkCtrl(e)) {
      return;
    }

    if (!this.dragging) {
      this.callbacks?.dragStart?.(e);
    }

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }

    this.dragging = true;
    this.activate();
    this.bindEvents();
  }

  onMove(e) {
    if (!this.dragging) {
      return;
    }

    this.callbacks?.drag?.(e);
  }

  onMouseUp(e) {
    if (this.dragging) {
      this.tryDrop(e);
      this.callbacks?.dragEnd?.(e);
    }

    this.dragging = false;
    this.deactivate();
    this.unbindEvents();
  }

  onPrevent(e) {
    if (!e.ctrlKey) {
      return;
    }

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }
  }

  tryDrop(e) {
    const active = Draggable.activeDroppables;

    active[0]?.onDrop({
      ev: e,
      draggable: this
    });

    if (active.length > 0) {
      const copy = active.slice();

      for (let i = 0; i < copy.length; i++) {
        copy[i].onFinish({
          ev: e,
          draggable: this
        })
      }
    }
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;

      this.deactivate();
      this.unbindMouseDown();
      this.unbindContextMenu();

      if (this.dragging) {
        this.unbindEvents();
      }

      this.element = null;
      this.callbacks = null;
    }
  }
}

export default Draggable;
