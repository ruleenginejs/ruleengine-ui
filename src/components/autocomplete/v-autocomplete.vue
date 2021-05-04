<template>
  <!--<div class="v-autocomplete">
    <v-input
      v-model="searchQuery"
      autocomplete="off"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :tabindex="tabIndex"
      :maxlength="maxLength"
      :id="anchorId"
    />
    <v-dropdown
      v-model:visible="dropdownVisible"
      :anchor="anchorId"
      anchor-constraint
    >
      <div v-if="loading" class="v-autocomplete__message">
        {{ loadingMessage }}
      </div>
      <div v-else-if="resultItems.length === 0" class="v-autocomplete__message">
        {{ emptyResultMessage }}
      </div>
      <v-list :items="resultItems" />
    </v-dropdown>
  </div>-->
  <div />
</template>

<script>
import { toRefs } from "vue";
import { VInput } from "@/components/input";
import useAutocomplete from "./use-autocomplete";

export default {
  name: "v-autocomplete",
  components: {
    VInput
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
    loadingMessage: {
      type: String,
      default: null
    },
    emptyResultMessage: {
      type: String,
      default: null
    },
    searchTimeout: {
      type: Number,
      default: 300
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
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    /*
    const {
      dataSource,
      modelValue,
      searchTimeout,
      minSearchLength,
      maxItemCount
    } = toRefs(props);

    const {
      searchQuery,
      dropdownVisible,
      resultItems,
      anchorId,
      loading
    } = useAutocomplete({
      dataSource,
      modelValue,
      emit,
      searchTimeout,
      minSearchLength,
      maxItemCount
    });

    return {
      searchQuery,
      dropdownVisible,
      resultItems,
      anchorId,
      loading
    };
    */
  }
};
</script>

<style>
@import "autocomplete";
</style>
