<template>
  <div class="v-tree-item" :class="itemClasses" tabindex="0" @click="onSelect">
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
  <template v-if="isEachChildren">
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
import { computed, defineAsyncComponent, toRefs } from "vue";
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

    const hasChildren = computed(() => !!children);
    const isRoot = computed(() => depth.value === 0);
    const indent = computed(() => `${depth.value * INDENT_FACTOR}rem`);
    const isEachChildren = computed(
      () => hasChildren.value && children.value.length && expanded?.value
    );

    const itemClasses = computed(() => ({
      "v-tree-item--root": isRoot.value,
      "v-tree-item--expanded": expanded?.value,
      "v-tree-item--selected": selected?.value
    }));

    const forward = (eventName) => (e) => emit(eventName, e);
    const forwardSelect = forward("select");

    const onSelect = () => {
      emit("select", {
        item: item.value,
        depth: depth.value
      });
    };

    return {
      hasChildren,
      isEachChildren,
      itemClasses,
      indent,
      onSelect,
      forwardSelect
    };
  }
};
</script>

<style>
@import "tree-item";
</style>
