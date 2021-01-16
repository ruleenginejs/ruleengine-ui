<template>
  <div
    class="v-graph-canvas"
    :class="{
      'v-graph-canvas--selected': selected,
      'v-graph-canvas--moving': moving
    }"
    v-draggable="draggableCallbacks"
    v-wheel.prevent.stop="wheelCallbacks"
    ref="container"
  >
    <div class="v-graph-canvas__layer" :style="{ transform: scaleStyle }">
      <div class="v-graph-canvas__layer" :style="{ transform: translateStyle }">
        <div
          v-if="$slots['connection']"
          class="v-graph-canvas__layer v-graph-canvas__svg-layer"
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
  </div>
</template>

<script>
import draggable from "@/directives/draggable";
import wheel from "@/directives/wheel";
import { provide, toRefs } from "vue";
import useCanvas from "./composables/use-canvas";

export default {
  name: "v-graph-canvas",
  directives: {
    draggable,
    wheel
  },
  props: {
    viewport: {
      type: Array,
      default: () => [0, 0]
    },
    zoom: {
      type: Number,
      default: 100
    },
    minZoom: {
      type: Number,
      default: 1
    },
    maxZoom: {
      type: Number,
      default: 300
    },
    zoomSnap: {
      type: Number,
      default: 1
    },
    zoomIntensity: {
      type: Number,
      default: 1
    },
    moveIntensity: {
      type: Number,
      default: 0.4
    }
  },
  emits: ["select", "update:zoom", "update:viewport"],
  setup(props, { emit }) {
    const {
      viewport,
      zoom,
      minZoom,
      maxZoom,
      zoomSnap,
      zoomIntensity,
      moveIntensity
    } = toRefs(props);

    const canvas = useCanvas(emit, {
      viewport,
      zoom,
      minZoom,
      maxZoom,
      zoomSnap,
      zoomIntensity,
      moveIntensity
    });

    const {
      selected,
      draggableCallbacks,
      wheelCallbacks,
      scaleStyle,
      translateStyle,
      container,
      moving
    } = canvas;

    provide("canvas", canvas);

    const getCanvas = () => canvas;

    return {
      draggableCallbacks,
      wheelCallbacks,
      selected,
      scaleStyle,
      translateStyle,
      container,
      moving,
      getCanvas
    };
  }
};
</script>

<style>
@import "graph-canvas";
</style>
