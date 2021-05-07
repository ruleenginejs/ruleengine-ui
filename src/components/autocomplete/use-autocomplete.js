import { isDefined } from "@/utils/types";
import { ref, getCurrentInstance, computed, watch } from "vue";

export default function useAutocomplete({
  modelValue,
  valueField,
  emit
}) {
  const uid = getCurrentInstance().uid;
  const anchorId = ref(`__v-autocomplete-input-${uid}`);
  const focused = ref(false);
  const searchQuery = ref("");
  const visible = ref(false);
  const focusItem = ref(null);
  const focusIndex = ref(0);

  const value = computed({
    get: () => modelValue.value,
    set: (val) => emit("update:modelValue", val)
  });

  watch(value, () => {
    if (focused.value) {
      visible.value = true;
      searchQuery.value = value.value;
    }
  });

  const resetSearch = () => {
    visible.value = false;
    searchQuery.value = "";
    focusItem.value = null;
    focusIndex.value = 0;
  };

  const focusForward = () => {
    focusIndex.value++;
  }

  const focusBackward = () => {
    focusIndex.value--;
  }

  const onFocusIn = () => {
    focused.value = true;
    resetSearch();
  }

  const onFocusOut = () => {
    focused.value = false;
    resetSearch();
  }

  const onError = (err) => {
    emit("error", err);
  };

  const onSelected = (val) => {
    if (!isDefined(val)) {
      value.value = null;
    } else if (isDefined(val[valueField.value])) {
      value.value = val[valueField.value];
    } else {
      value.value = null;
    }

    resetSearch();
  };

  const onSelectFocused = () => {
    onSelected(focusItem.value);
  }

  return {
    value,
    anchorId,
    focused,
    visible,
    searchQuery,
    focusIndex,
    focusItem,
    resetSearch,
    focusForward,
    focusBackward,
    onFocusIn,
    onFocusOut,
    onError,
    onSelected,
    onSelectFocused
  }
}
