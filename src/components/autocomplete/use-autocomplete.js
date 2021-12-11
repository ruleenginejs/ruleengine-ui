import { isDefined } from "@/utils/types";
import { ref, getCurrentInstance, computed, watch, nextTick } from "vue";

export default function useAutocomplete({
  modelValue,
  valueField,
  minSearchLength,
  emit
}) {
  const uid = getCurrentInstance().uid;
  const anchorId = ref(`__v-autocomplete-input-${uid}`);
  const focused = ref(false);
  const searchQuery = ref("");
  const visible = ref(false);
  const focusedItem = ref(null);
  const focusedIndex = ref(0);
  let lockSearch = false;

  const value = computed({
    get: () => toString(modelValue.value),
    set: (val) => emit("update:modelValue", val)
  });
  const valueLength = computed(() => value.value.length);

  const resetSearch = () => {
    visible.value = false;
    searchQuery.value = "";
    focusedItem.value = null;
    focusedIndex.value = 0;
  };

  const updateSearch = () => {
    visible.value = true;
    searchQuery.value = value.value;
  };

  watch(value, () => {
    if (lockSearch || !focused.value) {
      return;
    }

    if (valueLength.value >= minSearchLength.value) {
      updateSearch();
    } else {
      resetSearch();
    }
  });

  function focusForward() {
    focusedIndex.value++;
  }

  function focusBackward() {
    focusedIndex.value--;
  }

  function onFocusIn() {
    focused.value = true;
    resetSearch();
  }

  function onFocusOut() {
    focused.value = false;
    resetSearch();
  }

  function onError(err) {
    emit("error", err);
  }

  function onSelected(val) {
    if (!isDefined(val)) {
      value.value = null;
    } else if (isDefined(val[valueField.value])) {
      value.value = val[valueField.value];
    } else {
      value.value = null;
    }

    resetSearch();
    lockSearch = true;

    nextTick(() => {
      lockSearch = false;
    });
  }

  function onSelectFocused() {
    if (focusedItem.value) {
      onSelected(focusedItem.value);
    } else {
      resetSearch();
    }
  }

  function toString(val) {
    if (isDefined(val)) {
      return `${val}`;
    } else {
      return "";
    }
  }

  function onIconClick(e) {
    emit("icon-click", e);
  }

  return {
    value,
    anchorId,
    focused,
    visible,
    searchQuery,
    focusedIndex,
    focusedItem,
    resetSearch,
    updateSearch,
    focusForward,
    focusBackward,
    onFocusIn,
    onFocusOut,
    onError,
    onSelected,
    onSelectFocused,
    onIconClick
  }
}
