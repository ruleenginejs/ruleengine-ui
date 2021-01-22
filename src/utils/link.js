import "./link.css";
import Draggable from "./draggable";
import Point from "./point";
import degrees from "./degrees";

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
    this.controlElement = null;
    this.startPosition = null;
    this.snapDistance = 10;
    this.snapToCenter = true;

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
    const container = document.createElement("div");
    container.classList.add("v-link-control");

    const startMarker = document.createElement("div");
    startMarker.classList.add("v-link-control__start");

    const endMarker = document.createElement("div");
    endMarker.classList.add("v-link-control__end");

    container.appendChild(startMarker);
    container.appendChild(endMarker);
    this.controlElement = container;

    document.body?.appendChild(this.controlElement);
  }

  removeControlElement() {
    if (this.controlElement) {
      this.controlElement.parentNode?.removeChild(this.controlElement);
      this.controlElement = null;
    }
  }

  convertToElementPos(point) {
    const offset = this.element.getBoundingClientRect();

    return {
      x: point.x - offset.left,
      y: point.y - offset.top
    }
  }

  getCenterPosition(element) {
    const { left, top, width, height } = element.getBoundingClientRect();
    const pos = new Point(left, top);
    const size = new Point(width, height);
    return pos.add(size.divideBy(2));
  }

  getSize(element) {
    const { width, height } = element.getBoundingClientRect();
    return new Point(width, height);
  }

  initControlPosition(mousePos) {
    if (!this.controlElement) return;
    const s = this.controlElement.style;
    let pos;

    if (this.snapToCenter) {
      pos = this.getCenterPosition(this.element);
      pos.y -= 1;
    } else {
      pos = new Point(mousePos.x, mousePos.y);
      pos.y -= 3;
    }

    s.transform = `translate(${pos.x}px, ${pos.y}px)`;
    return pos;
  }

  updateControlPosition(startPos, newPos) {
    if (!this.controlElement) return;
    const s = this.controlElement.style;

    const pos = new Point(newPos.x, newPos.y - 3);
    const distance = startPos.distanceTo(pos);
    const deg = degrees(Math.atan2(pos.y - startPos.y, pos.x - startPos.x));

    s.width = `${distance}px`;
    s.transform = `translate(${startPos.x}px, ${startPos.y}px) rotate(${deg}deg)`;
  }

  onDragStart(e) {
    this.callbacks?.start?.(e);

    if (!this.controlElement) {
      this.createControlElement();
    }

    const { clientX, clientY } = e;
    const mousePos = new Point(clientX, clientY);
    this.startPosition = this.initControlPosition(mousePos);
  }

  onDrag(e) {
    this.callbacks?.move?.(e);

    const { clientX, clientY } = e;
    const newPos = new Point(clientX, clientY);
    this.updateControlPosition(this.startPosition, newPos);
  }

  onDragEnd(e) {
    this.callbacks?.end?.(e);

    this.removeControlElement();
    this.startPosition = null;
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
