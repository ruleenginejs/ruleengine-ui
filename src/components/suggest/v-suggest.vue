<template>
  <v-dropdown
    :class-name="cssClasses"
    v-model:visible="modelVisible"
    :anchor="anchor"
    :anchor-constraint="anchorConstraint"
    :action-when-scrolling="actionWhenParentScrolling"
    :offset-x="offsetX"
    :offset-y="offsetY"
  >
    <div v-if="loading" class="v-suggest__message">
      {{ loadingMessage }}
    </div>
    <div v-else-if="resultItems.length === 0" class="v-suggest__message">
      {{ emptyResultMessage }}
    </div>
    <v-list v-else :items="resultItems" :size="listSize" />
  </v-dropdown>
</template>

<script>
import { computed, toRefs } from "vue";
import useSuggest from "./use-suggest";
import { VList } from "@/components/list";
import { VDropdown } from "@/components/dropdown";

export default {
  name: "v-suggest",
  components: {
    VList,
    VDropdown
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Function,
      default: null
    },
    searchQuery: {
      type: [String, Number],
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
    maxQueryLength: {
      type: Number,
      default: null
    },
    maxItemCount: {
      type: Number,
      default: null
    },
    size: {
      type: String,
      default: "md"
    },
    listSize: {
      type: String,
      default: "md"
    },
    offsetX: {
      type: Number,
      default: null
    },
    offsetY: {
      type: Number,
      default: null
    },
    anchor: {
      type: String,
      default: null
    },
    anchorConstraint: {
      type: [Boolean, String],
      default: false
    },
    actionWhenParentScrolling: {
      type: [Boolean, String],
      default: "close"
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
  emits: ["update:visible", "select"],
  setup(props, { emit }) {
    const {
      size,
      visible,
      dataSource,
      searchQuery,
      searchTimeout,
      minSearchLength,
      maxQueryLength,
      maxItemCount
    } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-suggest": true,
      "v-suggest--sm": size.value === "sm",
      "v-suggest--md": size.value === "md"
    }));

    const { modelVisible, loading, resultItems } = useSuggest({
      emit,
      visible,
      dataSource,
      searchQuery,
      searchTimeout,
      minSearchLength,
      maxQueryLength,
      maxItemCount
    });

    return {
      modelVisible,
      loading,
      resultItems,
      cssClasses
    };
  }
};
</script>

<style>
@import "suggest";
</style>
