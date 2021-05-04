import { computed, ref, reactive } from "vue";

export default function useSuggest({
  emit,
  visible,
  dataSource,
  searchQuery,
  searchTimeout,
  minSearchLength,
  maxQueryLength,
  maxItemCount
}) {
  const loading = ref(false);
  const resultItems = reactive([]);

  const modelVisible = computed({
    get: () => visible.value,
    set: (val) => emit("update:visible", val)
  });

  return {
    modelVisible,
    loading,
    resultItems
  }
}
