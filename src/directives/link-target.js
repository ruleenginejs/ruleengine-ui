import LinkTarget from "@/utils/link-target";

const PROP = Symbol("link");

export default {
  mounted(el, { value, modifiers }) {
    el[PROP] = new LinkTarget(el, value, !!modifiers.stop);
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
