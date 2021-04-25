<template>
  <div class="v-field-layout" :class="cssClasses">
    <slot />
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
    }
  },
  setup(props) {
    const { vertical } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-field-layout--horizontal": !vertical.value,
      "v-field-layout--vertical": vertical.value
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
