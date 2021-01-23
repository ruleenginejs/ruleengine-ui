import GraphNode from "./graph-node";
import { markRaw, onUnmounted } from "vue";

export default function useNode(canvas, options) {
  const node = markRaw(new GraphNode(options));

  onUnmounted(() => {
    canvas?.removeNode(node.id);
  });

  canvas?.addNode(node);
  return node;
}
