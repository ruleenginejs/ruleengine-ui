<template>
  <div class="v-split-view" v-resize:[windowResizeDelay]="resizeCallbacks">
    <slot />
  </div>
</template>

<script>
import { toRefs } from "vue";
import useSplit from "./use-split";
import usePanes from "./use-panes";
import resize from "@/directives/resize";

export default {
  name: "v-split-view",
  directives: {
    resize
  },
  props: {
    horizontal: {
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
    customGutterClassName: {
      type: String,
      default: "v-split-gutter"
    },
    windowResizeDelay: {
      type: Number,
      default: 300
    }
  },
  emits: ["resize"],
  setup(props, { emit }) {
    const {
      horizontal,
      gutterSize,
      expandToMin,
      snapOffset,
      customGutterClassName
    } = toRefs(props);

    const { panes } = usePanes();

    const { getInstance, resizeCallbacks } = useSplit(panes, emit, {
      horizontal,
      gutterSize,
      expandToMin,
      snapOffset,
      customGutterClassName
    });

    return {
      resizeCallbacks,
      getInstance
    };
  }
};
</script>

<style>
@import "split-view";
</style>
