import Draggable from "@/utils/draggable";

const PROP = Symbol("draggable");

export default {
  mounted(el, { value, modifiers }) {
    el[PROP] = new Draggable(el, value, !!modifiers.stop);
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}
