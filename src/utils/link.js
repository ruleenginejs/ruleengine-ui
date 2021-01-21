/* eslint-disable no-unused-vars */
import Draggable from "./draggable";

class Link {
  constructor(element, options = null, stopEvent = false) {
    this.element = element;
    this.callbacks = {
      start: options?.start,
      move: options?.move,
      end: options?.end,
      data: options?.data
    };
    this.stopEvent = stopEvent;
    this.destroyed = false;
    this.startPosition = options?.startPosition ?? "cursor";
    this.controlElement = null;

    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.enable(options?.enabled ?? true);
  }

  enable(value) {
    this.destroyDraggable();
    this.removeControlElement();
    if (value) this.initDraggable();
    this.enabled = value;
  }

  update(options) {
    if (this.enabled !== options?.enabled) {
      debugger;
      this.enable(options?.enabled);
    }
  }

  initDraggable() {
    this.draggable = new Draggable(this.element, {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd,
      data: this.callbacks.data
    }, this.stopEvent);
  }

  destroyDraggable() {
    if (this.draggable) {
      this.draggable.destroy();
      this.draggable = null;
    }
  }

  createControlElement() {
    debugger;
    const container = document.createElement("div");
    container.classList.add("v-link-control");

    const startMarker = document.createElement("div");
    startMarker.classList.add("v-link-control__start");

    const endMarker = document.createElement("div");
    endMarker.classList.add("v-link-control__end");

    container.appendChild(startMarker).appendChild(endMarker);
    this.controlElement = container;

    document.body?.appendChild(this.controlElement);
  }

  removeControlElement() {
    if (this.controlElement) {
      this.controlElement.parentNode?.removeChild(this.controlElement);
      this.controlElement = null;
    }
  }

  onDragStart(e) {
    this.callbacks?.start?.(e);
  }

  onDrag(e) {
    this.callbacks?.move?.(e);
  }

  onDragEnd(e) {
    this.callbacks?.end?.(e);
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.destroyDraggable();
      this.removeControlElement();
      this.element = null;
      this.callbacks = null;
    }
  }
}

export default Link;
