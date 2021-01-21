class LinkTarget {
  constructor(element, options = null, stopEvent = false) {
    this.element = element;
    this.options = options;
    this.stopEvent = stopEvent;
    this.destroyed = false;
  }

  destroy() {
    debugger;
    if (!this.destroyed) {
      this.destroyed = true;
      this.element = null;
      this.options = null;
    }
  }
}

export default LinkTarget;
