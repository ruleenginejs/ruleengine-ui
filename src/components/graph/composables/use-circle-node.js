import { markRaw, onUnmounted } from 'vue';
import GraphCircleNode from './graph-circle-node';

export default function useCircleNode(canvas, options) {
  const node = markRaw(new GraphCircleNode(options));

  onUnmounted(() => {
    canvas?.removeNode(node.id);
  });

  canvas?.addNode(node);
  return node;
}
