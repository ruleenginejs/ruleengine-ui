import { ref, getCurrentInstance, computed, onBeforeUnmount } from "vue";
import SuggestionHandler from "./suggestion-handler";

export default function useAutocomplete({
  dataSource,
  modelValue,
  searchTimeout,
  minSearchLength,
  maxItemCount,
  emit
}) {
  const uid = getCurrentInstance().uid;
  const anchorId = ref(`autocomplete-input-${uid}`);

  const searchQuery = computed({
    get: () => modelValue.value,
    set: (val) => emit("update:modelValue", val)
  });

  const suggestionHandler = new SuggestionHandler(
    searchQuery,
    dataSource,
    searchTimeout,
    minSearchLength,
    maxItemCount
  );

  onBeforeUnmount(() => {
    suggestionHandler.destroy();
  });

  return {
    searchQuery,
    anchorId,
    dropdownVisible: suggestionHandler.dropdownVisible,
    resultItems: suggestionHandler.resultItems,
    loading: suggestionHandler.loading
  }
}
