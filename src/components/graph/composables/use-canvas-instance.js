import { reactive, watch, computed, ref } from "vue";

export default function useCanvasInstance(emit) {
  const nodes = reactive({});
  const selectedNodeId = ref(null);

  const instance = {
    selectNode(nodeId) {
      if (selectedNodeId.value) {
        this.setNodeSelected(selectedNodeId.value, false);
      }

      this.setNodeSelected(nodeId, true);
      selectedNodeId.value = nodeId;
    },
    deselectNode(nodeId) {
      if (selectedNodeId.value === nodeId) {
        this.setNodeSelected(nodeId, false);
        selectedNodeId.value = null;
      }
    },
    resetSelection() {
      if (selectedNodeId.value) {
        this.setNodeSelected(selectedNodeId.value, false);
        selectedNodeId.value = null;
      }
    },
    registerNode(nodeId, nodeInstance) {
      nodes[nodeId] = nodeInstance;
    },
    unregisterNode(nodeId) {
      if (nodes[nodeId]) {
        this.deselectNode(nodeId);
        delete nodes[nodeId];
      }
    },
    getNode(nodeId) {
      return nodes[nodeId];
    },
    setNodeSelected(nodeId, value) {
      const node = this.getNode(nodeId);
      if (node) {
        node.getSelected().value = value;
      }
    }
  };

  watch(selectedNodeId, () => {
    emit("select", selectedNodeId.value);
  })

  const selected = computed({
    get: () => !selectedNodeId.value,
    set: val => {
      if (val) {
        instance.resetSelection();
      }
    }
  });

  const onSelect = () => {
    selected.value = true;
  }

  return {
    instance,
    selected,
    onSelect
  };
}
