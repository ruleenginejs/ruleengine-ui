import "./link.css";
import Draggable from "./draggable";
import Point from "./point";
import degrees from "./degrees";
import isDefined from "./is-defined";

class Link {
  constructor(element, options = null, stopEvent = false, ctrl = null) {
    this.element = element;
    this.stopEvent = stopEvent;
    this.destroyed = false;
    this.enabled = true;
    this.draggable = null;
    this.ctrl = ctrl;

    this.controlElement = null;
    this.startPosition = null;
    this.snapToCenter = options?.snapToCenter ?? false;
    this.snapOffset = new Point(0, 1);
    this.cursorOffset = new Point(0, 3);

    this.callbacks = {
      start: options?.start,
      move: options?.move,
      end: options?.end,
      data: options?.data
    };

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
    if (isDefined(options?.enabled) && this.enabled !== options?.enabled) {
      this.enable(options?.enabled);
    }
  }

  initDraggable() {
    this.draggable = new Draggable(this.element, {
      dragStart: this.onDragStart,
      drag: this.onDrag,
      dragEnd: this.onDragEnd,
      data: this.callbacks.data
    }, this.stopEvent, this.ctrl);
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
      pos = this.getCenterPosition(this.element).subtract(this.snapOffset);
    } else {
      pos = (new Point(mousePos.x, mousePos.y)).subtract(this.cursorOffset);
    }

    s.transform = `translate(${pos.x}px, ${pos.y}px)`;
    return pos;
  }

  updateControlPosition(startPos, newPos, dropElement = null, snapToCenter = null) {
    if (!this.controlElement) return;
    const s = this.controlElement.style;
    let pos;

    let snap = this.snapToCenter;

    if (isDefined(snapToCenter)) {
      snap = snapToCenter;
    }

    if (snap && dropElement) {
      pos = this.getCenterPosition(dropElement).subtract(this.snapOffset);
    } else {
      pos = (new Point(newPos.x, newPos.y)).subtract(this.cursorOffset);
    }

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
    const droppable = Draggable.activeDroppable;

    this.updateControlPosition(
      this.startPosition,
      newPos,
      droppable?.element,
      droppable?.getData()?.snapToCenter
    );
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
