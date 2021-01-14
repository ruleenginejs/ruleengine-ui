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
import { provide } from "vue";
import useCanvas from "./composables/use-canvas";

export default {
  name: "v-graph-canvas",
  directives: {
    draggable
  },
  emits: ["select"],
  setup(props, { emit }) {
    const canvasInstance = useCanvas(emit);
    const { selected, draggableCallbacks } = canvasInstance;

    provide("canvas", canvasInstance);

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
