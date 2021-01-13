<template>
  <div class="v-graph-canvas" v-draggable="draggableCallbacks">
    <slot />
  </div>
</template>

<script>
import draggable from "@/directives/draggable";
import useCanvasDraggable from "./composables/use-canvas-draggable";

export default {
  name: "v-graph-canvas",
  directives: {
    draggable
  },
  setup() {
    const { draggableCallbacks } = useCanvasDraggable();

    return {
      draggableCallbacks
    };
  }
};
</script>

<style>
@import "graph-canvas";
</style>
