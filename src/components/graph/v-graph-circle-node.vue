<template>
  <div
    class="v-graph-circle-node"
    :class="{
      'v-graph-circle-node--error': error,
      'v-graph-circle-node--selected': selected,
      'v-graph-circle-node--moving': moving,
      'v-graph-circle-node--link-enter': linkEnter
    }"
    :style="{ transform: transformStyle, zIndex: zIndex }"
    v-draggable.noctrl.stop="draggableCallbacks"
    v-link.ctrl.stop="linkOptions"
    v-link-target.stop="linkTargetOptions"
    @click.prevent.stop="onSelect"
    ref="container"
  >
    <div
      class="v-graph-circle-node__label"
      :class="{ 'v-graph-circle-node__label--sm': truncateLength > 1 }"
    >
      {{ truncateTitle }}
    </div>
    <div v-if="$slots['port']" class="v-graph-circle-node__port">
      <slot name="port" />
    </div>
  </div>
</template>

<script>
import { inject, provide, toRefs } from "vue";
import draggable from "@/directives/draggable";
import link from "@/directives/link";
import linkTarget from "@/directives/link-target";
import useCircleNode from "./composables/use-circle-node";
import useTruncateTitle from "./composables/use-truncate-title";

export default {
  name: "v-graph-circle-node",
  directives: {
    draggable,
    link,
    linkTarget
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
    },
    selected: {
      type: Boolean,
      default: false
    },
    linkRule: {
      type: Function,
      default: null
    }
  },
  emits: ["update:x", "update:y", "update:selected", "new-link"],
  setup(props, { emit }) {
    const { x, y, title, id, linkRule } = toRefs(props);

    const canvas = inject("canvas");
    const node = useCircleNode(canvas, { id, x, y, emit, linkRule });
    const {
      transformStyle,
      moving,
      zIndex,
      container,
      draggableCallbacks,
      linkOptions,
      linkTargetOptions,
      linkEnter,
      onSelect
    } = node;

    const { truncateTitle, truncateLength } = useTruncateTitle(title, 2);

    const getNode = () => node;
    provide("node", node);

    return {
      node,
      moving,
      zIndex,
      container,
      transformStyle,
      truncateTitle,
      truncateLength,
      draggableCallbacks,
      linkOptions,
      linkTargetOptions,
      linkEnter,
      onSelect,
      getNode
    };
  }
};
</script>

<style>
@import "graph-circle-node";
</style>
