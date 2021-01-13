<template>
  <div
    class="v-graph-circle-node"
    :class="{
      'v-graph-circle-node--error': error,
      'v-graph-circle-node--selected': selected
    }"
    :style="{ transform: transformStyle }"
    @click="onSelect"
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
import { toRefs } from "vue";
import draggable from "@/directives/draggable";
import usePosition from "./composables/use-position";
import useTransform from "./composables/use-transform";
import useTruncateTitle from "./composables/use-truncate-title";
import useSelect from "./composables/use-select";
import useNodeDraggable from "./composables/use-node-draggable";

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
    const { x, y, title } = toRefs(props);

    const position = usePosition(x, y, emit);
    const transformStyle = useTransform(position);
    const { truncateTitle, truncateLength } = useTruncateTitle(title, 2);
    const { selected, onSelect } = useSelect();
    const { draggableCallbacks } = useNodeDraggable(position);

    return {
      transformStyle,
      truncateTitle,
      truncateLength,
      selected,
      onSelect,
      draggableCallbacks
    };
  }
};
</script>

<style>
@import "graph-circle-node";
</style>
