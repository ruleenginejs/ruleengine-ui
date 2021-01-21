<template>
  <div
    class="v-graph-port"
    :class="{
      'v-graph-port--error': error,
      'v-graph-port--disabled': disabled,
      'v-graph-port--active': linked
    }"
  >
    <div class="v-graph-port__anchor" ref="anchor"></div>
    <div v-if="$slots['default']" class="v-graph-port__label">
      <slot />
    </div>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";
import usePort from "./composables/use-port";

export default {
  name: "v-graph-port",
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
    }
  },
  emits: ["link", "unlink"],
  setup(props, { emit }) {
    const { id, disabled, linkLimit } = toRefs(props);
    const node = inject("node");

    const port = usePort(node, { id, disabled, linkLimit, emit });
    const { anchor, linked } = port;

    const getPort = () => port;

    return {
      anchor,
      linked,
      getPort
    };
  }
};
</script>

<style>
@import "graph-port";
</style>
