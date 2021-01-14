import GraphNode from "./graph-node";
import { onUnmounted, getCurrentInstance, watch, markRaw } from "vue";

export default function useNode(canvas, nodeId, posX, posY, emit) {
  const internalInstance = getCurrentInstance();
  const id = nodeId.value ?? internalInstance.uid;

  const nodeInstance = markRaw(new GraphNode(id, posX, posY, emit));
  canvas?.addNode(id, nodeInstance)

  onUnmounted(() => {
    canvas?.deselect(nodeInstance);
    canvas?.removeNode(id);
  })

  const updateSelected = () => {
    if (nodeInstance.selected.value) {
      canvas?.select(nodeInstance)
    } else {
      canvas?.deselect(nodeInstance)
    }
  }

  watch(nodeInstance.selected, updateSelected);
  updateSelected();

  return nodeInstance;
}
