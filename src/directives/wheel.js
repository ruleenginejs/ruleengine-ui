import Wheel from '@/utils/wheel';

const PROP = Symbol('wheel');

export default {
  mounted(el, { value, modifiers }) {
    el[PROP] = new Wheel(el, value, modifiers);
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
};
