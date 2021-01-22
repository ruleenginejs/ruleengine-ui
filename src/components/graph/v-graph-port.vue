<template>
  <div
    class="v-graph-port"
    :class="{
      'v-graph-port--error': error,
      'v-graph-port--disabled': disabled,
      'v-graph-port--active': linked
    }"
  >
    <div
      class="v-graph-port__anchor"
      :class="{
        'v-graph-port__anchor--linking': linking,
        'v-graph-port__anchor--link-enter': linkEnter
      }"
      v-link.stop="linkOptions"
      v-link-target.stop="linkTargetOptions"
      ref="anchor"
    >
      <v-icon-plus-bold />
    </div>
    <div v-if="$slots['default']" class="v-graph-port__label">
      <slot />
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
    linkLimit: {
      type: Number,
      default: null
    },
    linkRule: {
      type: Function,
      default: null
    }
  },
  emits: ["link", "unlink", "new-link"],
  setup(props, { emit }) {
    const { id, disabled, linkLimit, linkRule } = toRefs(props);
    const node = inject("node");

    const port = usePort(node, { id, disabled, linkLimit, linkRule, emit });
    const {
      anchor,
      linked,
      linkOptions,
      linkTargetOptions,
      linking,
      linkEnter
    } = port;

    const getPort = () => port;

    return {
      anchor,
      linked,
      linkOptions,
      linkTargetOptions,
      linking,
      linkEnter,
      getPort
    };
  }
};
</script>

<style>
@import "graph-port";
</style>
