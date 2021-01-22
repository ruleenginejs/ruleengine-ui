import Draggable from "./draggable";

class Droppable {
  constructor(element, callbacks = null, stopEvent = false) {
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.element = element;
    this.callbacks = callbacks;
    this.stopEvent = stopEvent;
    this.destroyed = false;

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener("mouseenter", this.onMouseEnter);
    this.element.addEventListener("mouseleave", this.onMouseLeave);
  }

  unbindEvents() {
    this.element.removeEventListener("mouseenter", this.onMouseEnter);
    this.element.removeEventListener("mouseleave", this.onMouseLeave);
  }

  activate() {
    Draggable.activeDroppable = this;
  }

  deactivate() {
    if (Draggable.activeDroppable === this) {
      Draggable.activeDroppable = null;
    }
  }

  onMouseEnter(e) {
    if (!Draggable.activeDraggable
      || Draggable.activeDraggable.element === this.element) {
      return;
    }

    this.callbacks?.dropEnter?.({
      ev: e,
      draggable: Draggable.activeDraggable
    });

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }

    this.activate();
  }

  onMouseLeave(e) {
    if (!Draggable.activeDraggable
      || Draggable.activeDraggable.element === this.element) {
      return;
    }

    this.callbacks?.dropLeave?.({
      ev: e,
      draggable: Draggable.activeDraggable
    });

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }

    this.deactivate();
  }

  onDrop(e) {
    this.callbacks?.drop?.(e);
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.deactivate();
      this.unbindEvents();
      this.element = null;
      this.callbacks = null;
    }
  }
}

export default Droppable;
