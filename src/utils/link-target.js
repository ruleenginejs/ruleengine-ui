import Droppable from "./droppable";

class LinkTarget {
  constructor(element, options = null, stopEvent = false) {
    this.element = element;
    this.stopEvent = stopEvent;
    this.destroyed = false;
    this.enabled = true;
    this.droppable = null;

    this.callbacks = {
      enter: options?.enter,
      leave: options?.leave,
      link: options?.link,
      rule: options?.rule
    };

    this.onDropEnter = this.onDropEnter.bind(this);
    this.onDropLeave = this.onDropLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);

    this.enable(options?.enabled ?? true);
  }

  enable(value) {
    this.destroyDroppable();
    if (value) this.initDroppable();
    this.enabled = value;
  }

  update(options) {
    if (this.enabled !== options?.enabled) {
      this.enable(options?.enabled);
    }
  }

  initDroppable() {
    this.droppable = new Droppable(this.element, {
      dropEnter: this.onDropEnter,
      dropLeave: this.onDropLeave,
      drop: this.onDrop
    }, this.stopEvent);
  }

  destroyDroppable() {
    if (this.droppable) {
      this.droppable.destroy();
      this.droppable = null;
    }
  }

  checkRule(e) {
    return this.callbacks?.rule?.(e.draggable?.getData()) ?? true;
  }

  onDropEnter(e) {
    if (!this.checkRule(e)) {
      return;
    }

    this.callbacks?.enter?.(e);
  }

  onDropLeave(e) {
    if (!this.checkRule(e)) {
      return;
    }

    this.callbacks?.leave?.(e);
  }

  onDrop(e) {
    if (!this.checkRule(e)) {
      return;
    }

    this.callbacks?.link?.({
      ...e,
      data: e.draggable?.getData()
    });
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.destroyDroppable();

      this.element = null;
      this.callbacks = null;
    }
  }
}

export default LinkTarget;
