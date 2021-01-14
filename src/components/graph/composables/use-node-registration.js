import { watch, onUnmounted } from "vue";

export default function useNodeRegistration(canvas, nodeId, nodeInstance) {
  canvas.registerNode(nodeId.value, nodeInstance);

  watch(nodeId, (newId, oldId) => {
    canvas.unregisterNode(oldId);
    canvas.registerNode(newId, nodeInstance);
  })

  onUnmounted(() => {
    canvas.unregisterNode(nodeId.value);
  })
}
