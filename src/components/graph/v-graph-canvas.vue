<template>
  <div
    class="v-graph-canvas"
    :class="{ 'v-graph-canvas--selected': selected }"
    v-draggable="draggableCallbacks"
  >
    <slot />
  </div>
</template>

<script>
import draggable from "@/directives/draggable";
import useCanvasDraggable from "./composables/use-canvas-draggable";
import useCanvasInstance from "./composables/use-canvas-instance";
import { provide } from "vue";

export default {
  name: "v-graph-canvas",
  directives: {
    draggable
  },
  emits: ["select"],
  setup(props, { emit }) {
    const { instance, selected, onSelect } = useCanvasInstance(emit);
    const { draggableCallbacks } = useCanvasDraggable(onSelect);

    provide("canvas", instance);

    return {
      draggableCallbacks,
      selected
    };
  }
};
</script>

<style>
@import "graph-canvas";
</style>
