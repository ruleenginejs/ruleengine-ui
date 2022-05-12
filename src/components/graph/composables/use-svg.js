import GraphSvg from './graph-svg';

import { markRaw } from 'vue';

export default function useSvg(options) {
  return markRaw(new GraphSvg(options));
}
