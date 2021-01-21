import Resizing from "@/utils/resizing";

const PROP = Symbol("resize");

export default {
  mounted(el, { value }) {
    el[PROP] = new Resizing(el, value);
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
}
