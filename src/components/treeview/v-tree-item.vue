<template>
  <div
    class="v-tree-item"
    :class="itemClasses"
    tabindex="-1"
    ref="container"
    @click="onSelect"
  >
    <div class="v-tree-item__indent" :style="{ width: indent }"></div>
    <div class="v-tree-item__chevron">
      <v-icon-chevron-down v-if="hasChildren" />
    </div>
    <div
      v-if="item.icon"
      class="v-tree-item__icon"
      :style="{ color: item.iconColor }"
    >
      <component :is="item.icon" />
    </div>
    <div v-if="item.name" class="v-tree-item__label">
      {{ item.name }}
    </div>
  </div>
  <template v-if="hasChildren && item.expanded">
    <v-tree-item
      v-for="(child, index) in item.children"
      :key="child.id || index"
      :item="child"
      :depth="depth + 1"
      @select="forwardSelect"
    />
  </template>
</template>

<script>
import { computed, defineAsyncComponent, ref, toRefs } from "vue";
import VIconChevronDown from "@/components/icons/v-icon-chevron-down";
const VTreeItem = defineAsyncComponent(() => import("./v-tree-item"));

const INDENT_FACTOR = 0.75;

export default {
  name: "v-tree-item",
  components: {
    VIconChevronDown,
    VTreeItem
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    depth: {
      type: Number,
      default: 0
    }
  },
  emits: ["select"],
  setup(props, { emit }) {
    const { depth, item } = toRefs(props);
    const { expanded, selected, children } = toRefs(props.item);
    const container = ref(null);

    const hasChildren = computed(() => children?.value.length);
    const isRoot = computed(() => depth.value === 0);
    const indent = computed(() => `${depth.value * INDENT_FACTOR}rem`);

    const itemClasses = computed(() => ({
      "v-tree-item--root": isRoot.value,
      "v-tree-item--expanded": expanded?.value,
      "v-tree-item--selected": selected?.value
    }));

    const forward = (eventName) => (e) => emit(eventName, e);

    const onSelect = () => {
      if (container.value) {
        container.value.focus();
      }

      emit("select", {
        item: item.value,
        depth: depth.value
      });
    };

    return {
      hasChildren,
      container,
      itemClasses,
      indent,
      onSelect,
      forwardSelect: forward("select")
    };
  }
};
</script>

<style>
@import "tree-item";
</style>
