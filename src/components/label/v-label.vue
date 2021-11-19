<template>
  <component class="v-label" :class="cssClasses" :is="tag">
    <slot></slot>
  </component>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-label",
  props: {
    tag: {
      type: String,
      default: "label"
    },
    truncate: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { truncate, disabled } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-label--truncate": truncate.value,
      "v-label--disabled": disabled.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import "label";
</style>
