class ScrollTrigger {
  constructor(element, callback, onceRun = false) {
    this.element = element;
    this.callback = callback;
    this.onceRun = onceRun;
    this.unbinder = null;
    this.doRun = this.doRun.bind(this);
  }

  start() {
    if (this.unbinder) {
      return;
    }
    const el = this.element;
    if (!el) {
      return;
    }
    el.addEventListener('scroll', this.doRun, { passive: true });

    this.unbinder = () => {
      el.removeEventListener('scroll', this.doRun, { passive: true });
    };
  }

  stop() {
    if (this.unbinder) {
      this.unbinder();
      this.unbinder = null;
    }
  }

  doRun() {
    this.callback?.();
    if (this.onceRun) {
      this.stop();
    }
  }

  destroy() {
    this.stop();
    this.element = null;
    this.callback = null;
  }
}

export default ScrollTrigger;
