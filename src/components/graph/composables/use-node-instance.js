import { getCurrentInstance, computed } from "vue";

export default function useNodeInstance(id, selected, position) {
  const internal = getCurrentInstance();
  const nodeId = computed(() => id.value ?? internal.uid);

  const instance = {
    getId() {
      return nodeId;
    },
    getSelected() {
      return selected;
    },
    getPosition() {
      return position;
    }
  };

  return {
    instance,
    nodeId
  };
}
