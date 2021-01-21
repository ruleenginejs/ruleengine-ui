import Link from "@/utils/link";

const PROP = Symbol("link");

export default {
  mounted(el, { value, modifiers }) {
    el[PROP] = new Link(el, value, !!modifiers.stop);
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
