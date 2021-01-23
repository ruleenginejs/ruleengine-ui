import Link from "@/utils/link";

const PROP = Symbol("link");

export default {
  mounted(el, { value, modifiers }) {
    const ctrl = modifiers.ctrl ? true : (modifiers.noctrl ? false : null);
    el[PROP] = new Link(el, value, !!modifiers.stop, ctrl);
  },
  updated(el, { value }) {
    if (el[PROP]) {
      el[PROP].update(value);
    }
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}
