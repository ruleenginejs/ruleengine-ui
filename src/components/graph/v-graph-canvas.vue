<template>
  <div
    class="v-graph-canvas"
    :class="{
      'v-graph-canvas--selected': selected,
      'v-graph-canvas--moving': moving
    }"
    v-draggable="draggableCallbacks"
    ref="container"
  >
    <div
      class="v-graph-canvas__layer"
      :style="{ transform: layerTransformStyle }"
    >
      <div
        v-if="$slots['connection']"
        class="v-graph-canvas__layer v-graph-canvas__connection-layer"
      >
        <slot name="connection" />
      </div>
      <div
        v-if="$slots['node']"
        class="v-graph-canvas__layer v-graph-canvas__node-layer"
      >
        <slot name="node" />
      </div>
    </div>
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
    const {
      selected,
      draggableCallbacks,
      layerTransformStyle,
      container,
      moving
    } = canvasInstance;

    provide("canvas", canvasInstance);

    return {
      draggableCallbacks,
      selected,
      layerTransformStyle,
      container,
      moving
    };
  }
};
</script>

<style>
@import "graph-canvas";
</style>
