<template>
  <div class="v-graph-node" :style="{ transform: transformStyle }" tabindex="0">
    <div class="v-graph-node__header">
      <div
        v-if="$slots['header-left-icon']"
        class="v-graph-node__header__icon v-graph-node__header__left"
      >
        <slot name="header-left-icon" />
      </div>
      <div class="v-graph-node__header__label" :title="title">{{ title }}</div>
      <div
        v-if="$slots['header-right-icon']"
        class="v-graph-node__header__icon v-graph-node__header__right"
      >
        <slot name="header-right-icon" />
      </div>
    </div>
    <div class="v-graph-node__content">
      <div
        v-if="$slots['left']"
        class="v-graph-node__part v-graph-node__part--left"
      >
        <slot name="left" />
      </div>
      <div
        v-if="$slots['right']"
        class="v-graph-node__part v-graph-node__part--right"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import usePosition from "./composables/use-position";
import useTransform from "./composables/use-transform";

export default {
  name: "v-graph-node",
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  emits: ["update:x", "update:y"],
  setup(props, { emit }) {
    const { x, y } = toRefs(props);

    const position = usePosition(x, y, emit);
    const transformStyle = useTransform(position);

    return {
      transformStyle
    };
  }
};
</script>

<style>
@import "graph-node";
</style>
