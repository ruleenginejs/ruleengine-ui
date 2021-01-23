<template>
  <div
    class="v-graph-node"
    :class="{
      'v-graph-node--selected': selected,
      'v-graph-node--moving': moving,
      'v-graph-node--link-enter': linkEnter
    }"
    :style="{ transform: transformStyle, zIndex: zIndex }"
    v-draggable.noctrl.stop="draggableCallbacks"
    v-link.ctrl.stop="linkOptions"
    v-link-target.stop="linkTargetOptions"
    @click.prevent.stop="onSelect"
    ref="container"
  >
    <div
      class="v-graph-node__header"
      :style="{ backgroundColor: colorStyle }"
      :class="colorClassName"
    >
      <div
        v-if="$slots['header-left-icon']"
        class="v-graph-node__header__icon v-graph-node__header__left"
      >
        <slot name="header-left-icon" />
      </div>
      <div class="v-graph-node__header__label" :title="title">{{ title }}</div>
      <div
        v-if="$slots['header-right-icon']"
        class="v-graph-node__header__icon v-graph-node__header__right"
      >
        <slot name="header-right-icon" />
      </div>
    </div>
    <div class="v-graph-node__content">
      <div
        v-if="$slots['left']"
        class="v-graph-node__part v-graph-node__part--left"
      >
        <slot name="left" />
      </div>
      <div
        v-if="$slots['right']"
        class="v-graph-node__part v-graph-node__part--right"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import { inject, provide, toRefs } from "vue";
import draggable from "@/directives/draggable";
import link from "@/directives/link";
import linkTarget from "@/directives/link-target";
import usePresetColor from "./composables/use-preset-color";
import useNode from "./composables/use-node";

const presetColors = ["blue", "green"];
const colorFn = (color) => `v-graph-node__header--${color}`;

export default {
  name: "v-graph-node",
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
    headerColor: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:x", "update:y", "update:selected", "new-link"],
  setup(props, { emit }) {
    const { x, y, headerColor, id } = toRefs(props);
    const canvas = inject("canvas");

    const node = useNode(canvas, id, x, y, emit);
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

    const { colorStyle, colorClassName } = usePresetColor(
      headerColor,
      presetColors,
      colorFn
    );

    const getNode = () => node;
    provide("node", node);

    return {
      node,
      moving,
      zIndex,
      container,
      transformStyle,
      colorStyle,
      colorClassName,
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
@import "graph-node";
</style>
