import { watch } from "vue";

export default function useNodeSelection(canvas, nodeId, selected) {
  const updateSelectedNode = () => {
    if (selected.value) {
      canvas.selectNode(nodeId.value)
    } else {
      canvas.deselectNode(nodeId.value)
    }
  }

  watch([selected, nodeId], updateSelectedNode);

  updateSelectedNode();
}
