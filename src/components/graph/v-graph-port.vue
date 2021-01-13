<template>
  <div
    class="v-graph-port"
    :class="{
      'v-graph-port--error': error,
      'v-graph-port--disabled': disabled
    }"
  >
    <div class="v-graph-port__anchor"></div>
    <div v-if="$slots['default']" class="v-graph-port__label">
      <slot />
    </div>
  </div>
</template>

<script>
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
    }
  }
};
</script>

<style>
@import "graph-port";
</style>
