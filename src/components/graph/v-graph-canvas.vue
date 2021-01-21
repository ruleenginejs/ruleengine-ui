<template>
  <div
    class="v-graph-canvas"
    :class="{
      'v-graph-canvas--selected': selected,
      'v-graph-canvas--moving': moving
    }"
    v-draggable="draggableCallbacks"
    v-wheel.prevent.stop="wheelCallbacks"
    v-resize="resizeCallbacks"
    ref="container"
  >
    <div class="v-graph-canvas__layer" :style="{ transform: scaleStyle }">
      <div class="v-graph-canvas__layer" :style="{ transform: translateStyle }">
        <v-graph-svg-layer
          v-if="$slots['connection']"
          :translate-x="layerPosition.x"
          :translate-y="layerPosition.y"
          :width="size.x"
          :height="size.y"
          :scale="scale"
        >
          <slot name="connection" />
        </v-graph-svg-layer>
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
import resize from "@/directives/resize";
import { provide, toRefs } from "vue";
import useCanvas from "./composables/use-canvas";
import VGraphSvgLayer from "./v-graph-svg-layer";

export default {
  name: "v-graph-canvas",
  directives: {
    draggable,
    wheel,
    resize
  },
  components: {
    VGraphSvgLayer
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
    },
    edgeMaxStep: {
      type: Number,
      default: 10
    },
    edgeSizes: {
      type: Object,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:selected", "update:zoom", "update:viewport"],
  setup(props, { emit }) {
    const {
      viewport,
      zoom,
      minZoom,
      maxZoom,
      zoomSnap,
      zoomIntensity,
      moveIntensity,
      edgeSizes,
      edgeMaxStep
    } = toRefs(props);

    const canvas = useCanvas(emit, {
      viewport,
      zoom,
      minZoom,
      maxZoom,
      zoomSnap,
      zoomIntensity,
      moveIntensity,
      edgeMaxStep,
      edgeSizes
    });

    const {
      draggableCallbacks,
      resizeCallbacks,
      wheelCallbacks,
      scaleStyle,
      translateStyle,
      container,
      moving,
      layerPosition,
      size,
      scale
    } = canvas;

    provide("canvas", canvas);
    const getCanvas = () => canvas;

    return {
      draggableCallbacks,
      wheelCallbacks,
      resizeCallbacks,
      scaleStyle,
      translateStyle,
      container,
      moving,
      layerPosition,
      size,
      scale,
      getCanvas
    };
  }
};
</script>

<style>
@import "graph-canvas";
</style>
