import { ref } from "vue";

export default function useSelect() {
  const selected = ref(false);

  const onSelect = () => {
    selected.value = true;
  }

  return {
    selected,
    onSelect
  }
}
