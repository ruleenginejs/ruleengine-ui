import { computed } from "vue";

export default function useDropdown({ visible, emit }) {
  const modelVisible = computed({
    get: () => visible.value,
    set: (val) => emit("update:visible", val)
  });

  return {
    modelVisible
  };
}
