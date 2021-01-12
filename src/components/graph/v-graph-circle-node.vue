<template>
  <div class="v-graph-circle-node" :style="{ transform: transformStyle }">
    <div
      class="v-graph-circle-node__label"
      :class="{ 'v-graph-circle-node__label--sm': truncateLength > 1 }"
    >
      {{ truncateTitle }}
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import usePosition from "./composables/use-position";
import useTransform from "./composables/use-transform";
import useTruncateTitle from "./composables/use-truncate-title";

export default {
  name: "v-graph-circle-node",
  props: {
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
    const { x, y, title } = toRefs(props);

    const position = usePosition(x, y, emit);
    const transformStyle = useTransform(position);
    const { truncateTitle, truncateLength } = useTruncateTitle(title, 2);

    return {
      transformStyle,
      truncateTitle,
      truncateLength
    };
  }
};
</script>

<style>
@import "graph-circle-node";
</style>
