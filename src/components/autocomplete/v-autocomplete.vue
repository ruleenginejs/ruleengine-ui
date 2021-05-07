<template>
  <v-input
    v-model="value"
    autocomplete="off"
    class-name="v-autocomplete"
    :placeholder="placeholder"
    :disabled="disabled"
    :readonly="readonly"
    :tabindex="tabIndex"
    :maxlength="maxLength"
    :id="anchorId"
    @focus.prevent="onFocusIn"
    @blur.prevent="onFocusOut"
    @keyup.esc="onKeyEsc"
    @keydown.down.prevent="onKeyDown"
    @keydown.up.prevent="onKeyUp"
    @keypress.enter.prevent.stop.self="onKeyEnter"
  />
  <v-suggest
    v-if="focused"
    v-model:visible="visible"
    v-model:list-focus-item="focusItem"
    v-model:list-focus-index="focusIndex"
    :anchor="anchorId"
    :search-query="searchQuery"
    :data-source="dataSource"
    :loading-message="loadingMessage"
    :empty-result-message="emptyResultMessage"
    :search-timeout="searchTimeout"
    :min-search-length="minSearchLength"
    :max-query-length="maxLength"
    :max-item-count="maxItemCount"
    anchor-constraint
    prevent-mouse-down
    list-focus-loop
    clear-on-invisible
    @error="onError"
    @select="onSelected"
  />
</template>

<script>
import { toRefs } from "vue";
import { VInput } from "@/components/input";
import { VSuggest } from "@/components/suggest";
import useAutocomplete from "./use-autocomplete";
import useKeyboard from "./use-keyboard";

export default {
  name: "v-autocomplete",
  components: {
    VInput,
    VSuggest
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    dataSource: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    valueField: {
      type: String,
      default: "text"
    },
    searchTimeout: {
      type: Number,
      default: 250
    },
    minSearchLength: {
      type: Number,
      default: 1
    },
    maxLength: {
      type: Number,
      default: null
    },
    maxItemCount: {
      type: Number,
      default: null
    },
    loadingMessage: {
      type: String,
      default: null
    },
    emptyResultMessage: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue", "error"],
  setup(props, { emit }) {
    const { modelValue, valueField } = toRefs(props);

    const {
      value,
      anchorId,
      focused,
      visible,
      searchQuery,
      focusIndex,
      focusItem,
      resetSearch,
      updateSearch,
      focusForward,
      focusBackward,
      onFocusIn,
      onFocusOut,
      onError,
      onSelected,
      onSelectFocused
    } = useAutocomplete({ modelValue, valueField, emit });

    const { onKeyEsc, onKeyDown, onKeyUp, onKeyEnter } = useKeyboard({
      visible,
      resetSearch,
      updateSearch,
      focusForward,
      focusBackward,
      onSelectFocused
    });

    return {
      value,
      anchorId,
      focused,
      visible,
      searchQuery,
      focusIndex,
      focusItem,
      onFocusIn,
      onFocusOut,
      onError,
      onSelected,
      onKeyEsc,
      onKeyDown,
      onKeyUp,
      onKeyEnter
    };
  }
};
</script>

<style>
@import "autocomplete";
</style>
