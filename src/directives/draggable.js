import Draggable from "@/utils/draggable";

const PROP = Symbol("draggable");

export default {
  mounted(el, { value, modifiers }) {
    const ctrl = modifiers.ctrl ? true : (modifiers.noctrl ? false : null);
    el[PROP] = new Draggable(el, value, !!modifiers.stop, ctrl);
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}
