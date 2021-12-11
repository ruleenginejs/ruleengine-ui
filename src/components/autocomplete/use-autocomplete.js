import { isDefined } from "@/utils/types";
import { ref, getCurrentInstance, computed, watch, nextTick } from "vue";

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
  const focusedItem = ref(null);
  const focusedIndex = ref(0);
  let lockSearch = false;

  const value = computed({
    get: () => modelValue.value,
    set: (val) => emit("update:modelValue", val)
  });

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
    if (!lockSearch && focused.value) {
      updateSearch();
    }
  });

  const focusForward = () => {
    focusedIndex.value++;
  }

  const focusBackward = () => {
    focusedIndex.value--;
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
    lockSearch = true;

    nextTick(() => {
      lockSearch = false;
    });
  };

  const onSelectFocused = () => {
    if (focusedItem.value) {
      onSelected(focusedItem.value);
    } else {
      resetSearch();
    }
  }

  const onIconClick = (e) => {
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
