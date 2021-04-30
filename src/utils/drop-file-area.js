class DropFileArea {
  constructor(element, options = null) {
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleSyntheticLeave = this.handleSyntheticLeave.bind(this);
    this.onSyntheticLeave = this.onSyntheticLeave.bind(this);

    this.element = element;
    this.callbacks = options?.callbacks;
    this.stopEvent = options?.stopEvent ?? false;
    this.syntheticLeave = options?.syntheticLeave ?? false;
    this.leaveTime = options?.syntheticLeaveTime ?? 100;
    this.destroyed = false;
    this.lastDrag = null;
    this.hideInterval = null;

    this.bindEvents();
  }

  bindEvents() {
    this.element.addEventListener("dragenter", this.onDragEnter, false);
    this.element.addEventListener("dragover", this.onDragOver, false);
    this.element.addEventListener("drop", this.onDrop, false);

    if (!this.syntheticLeave) {
      this.element.addEventListener("dragleave", this.onDragLeave, false);
    }
  }

  unbindEvents() {
    this.element.removeEventListener("dragenter", this.onDragEnter, false);
    this.element.removeEventListener("dragover", this.onDragOver, false);
    this.element.removeEventListener("drop", this.onDrop, false);

    if (!this.syntheticLeave) {
      this.element.removeEventListener("dragleave", this.onDragLeave, false);
    }
  }

  isDraggingFile(e) {
    if (!e.dataTransfer) {
      return false;
    }

    const { types } = e.dataTransfer;
    if (types.length === 0 || typeof types[0] !== "string") {
      return false;
    }

    const type = types[0].toLowerCase();
    return type === "files";
  }

  onDragEnter(e) {
    if (!this.isDraggingFile(e)) {
      return;
    }

    this.callbacks?.enter?.(e);

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }

    if (this.syntheticLeave) {
      this.lastDrag = new Date();
      this.startSyntheticLeave();
    }
  }

  onDragOver(e) {
    if (!this.isDraggingFile(e)) {
      return;
    }

    this.callbacks?.over?.(e);

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }

    if (this.syntheticLeave) {
      this.lastDrag = new Date();
    }
  }

  onDragLeave(e) {
    if (!this.isDraggingFile(e)) {
      return;
    }

    this.callbacks?.leave?.(e);

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }
  }

  onDrop(e) {
    if (!this.isDraggingFile(e)) {
      return;
    }

    const files = [...e.dataTransfer.files];
    if (files.length === 0) {
      return;
    }

    this.callbacks?.drop?.(e, files);

    e.preventDefault();

    if (this.stopEvent) {
      e.stopPropagation();
    }
  }

  onSyntheticLeave() {
    this.callbacks?.leave?.({ currentTarget: this.element });
  }

  startSyntheticLeave() {
    if (!this.hideInterval) {
      this.hideInterval = setInterval(this.handleSyntheticLeave, this.leaveTime);
    }
  }

  handleSyntheticLeave() {
    const sinceLastDrag = new Date() - this.lastDrag;

    if (sinceLastDrag > this.leaveTime) {
      this.onSyntheticLeave();
      this.stopSyntheticLeave();
    }
  }

  stopSyntheticLeave() {
    if (this.hideInterval) {
      clearInterval(this.hideInterval);
      this.hideInterval = null;
    }
  }

  destroy() {
    if (!this.destroyed) {
      this.destroyed = true;
      this.stopSyntheticLeave();
      this.unbindEvents();
      this.element = null;
      this.callbacks = null;
    }
  }
}

export default DropFileArea;
