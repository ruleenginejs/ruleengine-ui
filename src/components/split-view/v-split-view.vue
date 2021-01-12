<template>
  <div
    class="v-split-view"
    :class="{
      'v-split-view--vertical': vertical,
      'v-split-view--horizontal': !vertical
    }"
  >
    <slot />
  </div>
</template>

<script>
import { toRefs } from "vue";
import useSplit from "./use-split";
import usePanes from "./use-panes";

export default {
  name: "v-split-view",
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    gutterSize: {
      type: Number,
      default: 4
    },
    expandToMin: {
      type: Boolean,
      default: false
    },
    snapOffset: {
      type: Number,
      default: 0
    },
    sizes: {
      type: Array,
      default: null
    },
    minSize: {
      type: Number,
      default: 0
    },
    minSizes: {
      type: Array,
      default: null
    }
  },
  emits: ["drag", "drag-start", "drag-end"],
  setup(props, { emit }) {
    const {
      vertical,
      gutterSize,
      expandToMin,
      snapOffset,
      minSize,
      minSizes,
      sizes
    } = toRefs(props);

    const { panes } = usePanes();

    const { collapse } = useSplit(panes, emit, {
      vertical,
      gutterSize,
      expandToMin,
      snapOffset,
      minSize,
      minSizes,
      sizes
    });

    return {
      collapse
    };
  }
};
</script>

<style>
@import "split-view";
</style>
