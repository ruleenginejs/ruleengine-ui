<template>
  <div
    class="v-graph-port"
    :class="{
      'v-graph-port--error': error,
      'v-graph-port--disabled': disabled,
      'v-graph-port--active': linked,
      'v-graph-port--selected': selected,
      'v-graph-port--no-label': !$slots['default']
    }"
  >
    <div
      class="v-graph-port__anchor"
      :class="{
        'v-graph-port__anchor--link-start': linkStart,
        'v-graph-port__anchor--link-enter': linkEnter
      }"
      v-link.stop="linkOptions"
      v-link-target.stop="linkTargetOptions"
      ref="anchor"
    >
      <v-icon-plus-bold />
    </div>
    <div v-if="$slots['default']" class="v-graph-port__label">
      <span
        class="v-graph-port__label__text"
        :class="{
          'v-graph-port__label__text--link-start': labelLinkStart,
          'v-graph-port__label__text--link-enter': labelLinkEnter
        }"
        v-link.ctrl.stop="labelLinkOptions"
        v-link-target.stop="labelLinkTargetOptions"
        @mousedown="onMouseDown"
      >
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import link from "@/directives/link";
import linkTarget from "@/directives/link-target";
import usePort from "./composables/use-port";
import VIconPlusBold from "@/components/icons/v-icon-plus-bold.vue";

export default {
  name: "v-graph-port",
  directives: {
    link,
    linkTarget
  },
  components: {
    VIconPlusBold
  },
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    error: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    linkLimit: {
      type: Number,
      default: null
    },
    linkRule: {
      type: Function,
      default: null
    },
    direction: {
      type: String,
      default: null
    }
  },
  emits: ["link", "unlink", "new-link", "update:selected"],
  setup(props, { emit }) {
    const { id, disabled, linkLimit, linkRule, direction } = toRefs(props);
    const node = inject("node");

    const port = usePort(node, {
      id,
      disabled,
      linkLimit,
      linkRule,
      emit,
      direction
    });
    const {
      anchor,
      linked,
      linkOptions,
      linkTargetOptions,
      linkStart,
      linkEnter,
      labelLinkOptions,
      labelLinkTargetOptions,
      labelLinkStart,
      labelLinkEnter,
      onMouseDown
    } = port;

    const getPort = () => port;

    return {
      anchor,
      linked,
      linkOptions,
      linkTargetOptions,
      linkStart,
      linkEnter,
      labelLinkOptions,
      labelLinkTargetOptions,
      labelLinkStart,
      labelLinkEnter,
      onMouseDown,
      getPort
    };
  }
};
</script>

<style>
@import "graph-port";
</style>
