import { toInt } from '@/utils/number';
import Resizing from '@/utils/resizing';

const PROP = Symbol('resize');

export default {
  mounted(el, { value, arg }) {
    el[PROP] = new Resizing(el, value, toInt(arg));
  },
  beforeUnmount(el) {
    if (el[PROP]) {
      el[PROP].destroy();
      delete el[PROP];
    }
  }
};
