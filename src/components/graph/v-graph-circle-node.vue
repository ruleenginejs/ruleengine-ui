<template>
  <div
    class="v-graph-circle-node"
    :class="{
      'v-graph-circle-node--error': error,
      'v-graph-circle-node--selected': selected
    }"
    :style="{ transform: transformStyle }"
    v-draggable.stop="draggableCallbacks"
  >
    <div
      class="v-graph-circle-node__label"
      :class="{ 'v-graph-circle-node__label--sm': truncateLength > 1 }"
    >
      {{ truncateTitle }}
    </div>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import draggable from "@/directives/draggable";
import useNode from "./composables/use-node";
import useTruncateTitle from "./composables/use-truncate-title";

export default {
  name: "v-graph-circle-node",
  directives: {
    draggable
  },
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
    },
    error: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:x", "update:y"],
  setup(props, { emit }) {
    const { x, y, title, id } = toRefs(props);
    const { truncateTitle, truncateLength } = useTruncateTitle(title, 2);

    const canvas = inject("canvas");
    const nodeInstance = useNode(canvas, id, x, y, emit);
    const { transformStyle, selected, draggableCallbacks } = nodeInstance;

    return {
      transformStyle,
      truncateTitle,
      truncateLength,
      selected,
      draggableCallbacks
    };
  }
};
</script>

<style>
@import "graph-circle-node";
</style>
