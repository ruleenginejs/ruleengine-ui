<template>
  <div class="v-action-bar" :class="cssClasses">
    <slot />
  </div>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-action-bar",
  props: {
    lBorder: {
      type: Boolean,
      default: false
    },
    rBorder: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { lBorder, rBorder, right } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-action-bar--l-border": lBorder.value,
      "v-action-bar--r-border": rBorder.value,
      "v-action-bar--right": right.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import "action-bar";
</style>
