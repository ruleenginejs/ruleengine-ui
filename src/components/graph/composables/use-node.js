import GraphNode from "./graph-node";
import { markRaw, onUnmounted } from "vue";

export default function useNode(canvas, nodeId, posX, posY, emit) {
  const node = markRaw(new GraphNode(nodeId, posX, posY, emit));

  onUnmounted(() => {
    canvas?.removeNode(node.id);
  });

  canvas?.addNode(node);
  return node;
}
