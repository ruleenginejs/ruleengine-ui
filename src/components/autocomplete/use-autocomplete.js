import { ref, getCurrentInstance, computed, watch } from "vue";

export default function useAutocomplete({
  modelValue,
  emit
}) {
  const uid = getCurrentInstance().uid;
  const anchorId = ref(`autocomplete-input-${uid}`);
  const focused = ref(false);
  const suggestVisible = ref(false);
  const searchQuery = ref("");

  const value = computed({
    get: () => modelValue.value,
    set: (val) => emit("update:modelValue", val)
  });

  watch(value, () => {
    suggestVisible.value = true;
    searchQuery.value = value.value;
  });

  const onInputFocus = () => {
    focused.value = true;
  }

  const onInputBlur = () => {
    focused.value = false;
    suggestVisible.value = false;
    searchQuery.value = "";
  }

  const onSuggestError = (err) => {
    emit("error", err);
  };

  const onSuggestSelected = (val) => {
  };

  return {
    value,
    anchorId,
    focused,
    suggestVisible,
    searchQuery,
    onInputFocus,
    onInputBlur,
    onSuggestError,
    onSuggestSelected
  }
}
