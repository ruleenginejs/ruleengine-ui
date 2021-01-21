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
      :class="{ 'v-graph-port__anchor--linking': linking }"
      v-link.stop="linkOptions"
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
import usePort from "./composables/use-port";
import VIconPlusBold from "@/components/icons/v-icon-plus-bold.vue";

export default {
  name: "v-graph-port",
  directives: {
    link
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
    }
  },
  emits: ["link", "unlink"],
  setup(props, { emit }) {
    const { id, disabled, linkLimit } = toRefs(props);
    const node = inject("node");

    const port = usePort(node, { id, disabled, linkLimit, emit });
    const { anchor, linked, linkOptions, linking } = port;

    const getPort = () => port;

    return {
      anchor,
      linked,
      linkOptions,
      linking,
      getPort
    };
  }
};
</script>

<style>
@import "graph-port";
</style>
