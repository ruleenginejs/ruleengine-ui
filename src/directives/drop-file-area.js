import DropFileArea from "@/utils/drop-file-area";

const PROP = Symbol("drop-file-area");

export default {
  mounted(el, { value, modifiers }) {
    el[PROP] = new DropFileArea(el, {
      callbacks: value,
      stopEvent: !!modifiers.stop,
      syntheticLeave: !!modifiers.synthetic
    });
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}
