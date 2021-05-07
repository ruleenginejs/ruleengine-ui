import { isDefined } from "@/utils/types";
import { ref, getCurrentInstance, computed, watch } from "vue";

export default function useAutocomplete({
  modelValue,
  valueField,
  emit
}) {
  const uid = getCurrentInstance().uid;
  const anchorId = ref(`autocomplete-input-${uid}`);
  const focused = ref(false);
  const suggestVisible = ref(false);
  const searchQuery = ref("");
  const input = ref(null);

  const value = computed({
    get: () => modelValue.value,
    set: (val) => emit("update:modelValue", val)
  });

  watch(value, () => {
    if (focused.value) {
      suggestVisible.value = true;
      searchQuery.value = value.value;
    }
  });

  const resetSuggest = () => {
    suggestVisible.value = false;
    searchQuery.value = "";
  };

  const onInputFocus = () => {
    focused.value = true;
    resetSuggest();
  }

  const onInputBlur = () => {
    focused.value = false;
    resetSuggest();
  }

  const onSuggestError = (err) => {
    emit("error", err);
  };

  const onSuggestSelected = (val) => {
    if (!isDefined(val)) {
      value.value = null;
    } else if (isDefined(val[valueField.value])) {
      value.value = val[valueField.value];
    } else {
      value.value = null;
    }

    input.value?.inputEl?.blur();
    focused.value = false;
    resetSuggest();
  };

  return {
    value,
    input,
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
