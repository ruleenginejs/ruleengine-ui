<template>
  <v-dropdown
    :class-name="cssClasses"
    v-model:visible="modelVisible"
    :anchor="anchor"
    :anchor-constraint="anchorConstraint"
    :action-when-scrolling="actionWhenParentScrolling"
    :offset-x="offsetX"
    :offset-y="offsetY"
    :max-width="maxWidth"
    :max-height="maxHeight"
    :min-width="minWidth"
    :prevent-mouse-down="preventMouseDown"
  >
    <div v-if="loading" class="v-suggest__message">
      {{ loadingMessage }}
    </div>
    <div v-else-if="resultItems.length === 0" class="v-suggest__message">
      {{ emptyResultMessage }}
    </div>
    <v-list
      v-else
      :items="resultItems"
      :size="listSize"
      :display-field="displayField"
      v-model:focused="modelListFocusItem"
      v-model:focus-index="modelListFocusIndex"
      :focus-loop="listFocusLoop"
      @select="onSelect"
    />
  </v-dropdown>
</template>

<script>
import { computed, toRefs, watch } from "vue";
import useSearch from "./use-search";
import useDropdown from "./use-dropdown";
import useList from "./use-list";
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
    displayField: {
      type: String,
      default: "text"
    },
    searchQuery: {
      type: [String, Number],
      default: null
    },
    searchTimeout: {
      type: Number,
      default: 250
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
    listFocusItem: {
      type: Object,
      default: null
    },
    listFocusIndex: {
      type: Number,
      default: null
    },
    listFocusLoop: {
      type: Boolean,
      default: false
    },
    offsetX: {
      type: Number,
      default: null
    },
    offsetY: {
      type: Number,
      default: null
    },
    maxWidth: {
      type: Number,
      default: 450
    },
    maxHeight: {
      type: Number,
      default: 200
    },
    minWidth: {
      type: Number,
      default: 400
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
    },
    preventMouseDown: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    "update:visible",
    "update:listFocusItem",
    "update:listFocusIndex",
    "select",
    "error"
  ],
  setup(props, { emit }) {
    const {
      size,
      visible,
      dataSource,
      searchQuery,
      searchTimeout,
      minSearchLength,
      maxQueryLength,
      maxItemCount,
      listFocusItem,
      listFocusIndex
    } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-suggest": true,
      "v-suggest--sm": size.value === "sm",
      "v-suggest--md": size.value === "md"
    }));

    const { modelVisible } = useDropdown({ visible, emit });

    const { modelListFocusItem, modelListFocusIndex, onSelect } = useList({
      listFocusItem,
      listFocusIndex,
      emit
    });

    const { loading, resultItems, error } = useSearch({
      dataSource,
      searchQuery,
      searchTimeout,
      minSearchLength,
      maxQueryLength,
      maxItemCount
    });

    watch(error, () => {
      emit("error", error.value);
    });

    return {
      modelVisible,
      modelListFocusItem,
      modelListFocusIndex,
      loading,
      resultItems,
      cssClasses,
      onSelect
    };
  }
};
</script>

<style>
@import "suggest";
</style>
