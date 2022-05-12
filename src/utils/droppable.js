import Draggable from './draggable';

class Droppable {
  constructor(element, callbacks = null, stopEvent = false, group = null) {
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.element = element;
    this.callbacks = callbacks;
    this.stopEvent = stopEvent;
    this.group = group;
    this.destroyed = false;

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener('mouseenter', this.onMouseEnter);
    this.element.addEventListener('mouseleave', this.onMouseLeave);
  }

  unbindEvents() {
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
  }

  activate() {
    Draggable.activeDroppables.unshift(this);
  }

  deactivate() {
    const index = Draggable.activeDroppables.indexOf(this);
    if (index > -1) {
      Draggable.activeDroppables.splice(index, 1);
    }
  }

  getData() {
    return this.callbacks?.data?.();
  }

  onMouseEnter(e) {
    if (
      !Draggable.activeDraggable ||
      Draggable.activeDraggable.element === this.element ||
      Draggable.activeDraggable.group !== this.group
    ) {
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
    if (
      !Draggable.activeDraggable ||
      Draggable.activeDraggable.element === this.element ||
      Draggable.activeDraggable.group !== this.group
    ) {
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
    this.deactivate();
  }

  onFinish(e) {
    this.callbacks?.dropFinish?.(e);
    this.deactivate();
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
