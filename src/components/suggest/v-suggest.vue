<template>
  <v-dropdown
    class-name="v-suggest"
    v-model:visible="modelVisible"
    :anchor="anchor"
    :anchor-constraint="anchorConstraint"
    :action-when-scrolling="actionWhenParentScrolling"
  >
    <div v-if="loading" class="v-suggest__message">
      {{ loadingMessage }}
    </div>
    <div v-else-if="resultItems.length === 0" class="v-suggest__message">
      {{ emptyResultMessage }}
    </div>
    <v-list :items="resultItems" />
  </v-dropdown>
</template>

<script>
import { toRefs } from "vue";
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
      visible,
      dataSource,
      searchQuery,
      searchTimeout,
      minSearchLength,
      maxQueryLength,
      maxItemCount
    } = toRefs(props);

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
      resultItems
    };
  }
};
</script>
