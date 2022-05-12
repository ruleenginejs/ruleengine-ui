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
    ref="container"
  >
    <div
      class="v-graph-node__header"
      :style="{ backgroundColor: colorStyle }"
      :class="colorCssClass"
    >
      <div
        v-if="$slots['header-left-icon']"
        class="v-graph-node__header__icon v-graph-node__header__left"
      >
        <slot name="header-left-icon"></slot>
      </div>
      <div class="v-graph-node__header__label" :title="title">{{ title }}</div>
      <div
        v-if="$slots['header-right-icon']"
        class="v-graph-node__header__icon v-graph-node__header__right"
      >
        <slot name="header-right-icon"></slot>
      </div>
    </div>
    <div class="v-graph-node__content">
      <div
        v-if="$slots['left']"
        class="v-graph-node__part v-graph-node__part--left"
      >
        <slot name="left"></slot>
      </div>
      <div
        v-if="$slots['right']"
        class="v-graph-node__part v-graph-node__part--right"
      >
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { inject, provide, toRefs } from 'vue';
import draggable from '@/directives/draggable';
import link from '@/directives/link';
import linkTarget from '@/directives/link-target';
import useColorPreset from './composables/use-color-preset';
import useNode from './composables/use-node';

export default {
  name: 'v-graph-node',
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
    },
    linkRule: {
      type: Function,
      default: null
    },
    clickTolerance: {
      type: Number,
      default: 3
    },
    invalidate: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'update:x',
    'update:y',
    'update:selected',
    'update:invalidate',
    'new-link',
    'change-position'
  ],
  setup(props, { emit }) {
    const { x, y, id, headerColor, linkRule, clickTolerance, invalidate } =
      toRefs(props);

    const canvas = inject('canvas');
    const node = useNode(canvas, {
      id,
      x,
      y,
      emit,
      linkRule,
      clickTolerance,
      invalidate
    });

    const {
      transformStyle,
      moving,
      zIndex,
      container,
      draggableCallbacks,
      linkOptions,
      linkTargetOptions,
      linkEnter
    } = node;

    const { colorStyle, colorCssClass } = useColorPreset(headerColor);

    const getNode = () => node;
    provide('node', node);

    return {
      node,
      moving,
      zIndex,
      container,
      transformStyle,
      colorStyle,
      colorCssClass,
      draggableCallbacks,
      linkOptions,
      linkTargetOptions,
      linkEnter,
      getNode
    };
  }
};
</script>

<style>
@import 'graph-node';
</style>
