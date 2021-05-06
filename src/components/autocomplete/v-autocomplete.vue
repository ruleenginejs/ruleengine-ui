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
    @focus.prevent="onInputFocus"
    @blur.prevent="onInputBlur"
  />
  <v-suggest
    v-if="focused"
    v-model:visible="suggestVisible"
    :anchor="anchorId"
    anchor-constraint
    :search-query="searchQuery"
    :data-source="dataSource"
    :loading-message="loadingMessage"
    :empty-result-message="emptyResultMessage"
    :search-timeout="searchTimeout"
    :min-search-length="minSearchLength"
    :max-query-length="maxLength"
    :max-item-count="maxItemCount"
    @error="onSuggestError"
    @select="onSuggestSelected"
  />
</template>

<script>
import { toRefs } from "vue";
import { VInput } from "@/components/input";
import { VSuggest } from "@/components/suggest";
import useAutocomplete from "./use-autocomplete";

export default {
  name: "v-autocomplete",
  components: {
    VInput,
    VSuggest
  },
  props: {
    modelValue: {
      type: [String, Number, Object],
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
    const { modelValue } = toRefs(props);

    const {
      value,
      anchorId,
      focused,
      suggestVisible,
      searchQuery,
      onInputFocus,
      onInputBlur,
      onSuggestError,
      onSuggestSelected
    } = useAutocomplete({
      modelValue,
      emit
    });

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
    };
  }
};
</script>

<style>
@import "autocomplete";
</style>
