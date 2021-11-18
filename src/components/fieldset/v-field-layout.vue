<template>
  <div v-if="$slots.label || $slots.value" class="v-field-layout" :class="cssClasses">
    <div v-if="$slots.label" class="v-field-layout__label">
      <slot name="label"></slot>
    </div>
    <div v-if="$slots.value" class="v-field-layout__value">
      <slot name="value"></slot>
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-field-layout",
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { vertical, top } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-field-layout--horizontal": !vertical.value,
      "v-field-layout--vertical": vertical.value,
      "v-field-layout--top": top.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import "field-layout";
</style>
