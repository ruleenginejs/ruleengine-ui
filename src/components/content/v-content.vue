<template>
  <component class="v-content" :class="cssClasses" :is="tag">
    <slot />
  </component>
</template>

<script>
import { computed, toRefs } from "vue";
export default {
  name: "v-content",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    padding: {
      type: String,
      default: "md"
    },
    wFull: {
      type: Boolean,
      default: false
    },
    hFull: {
      type: Boolean,
      default: false
    },
    allDistr: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { padding, wFull, hFull, allDistr, scroll } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-content--padding-sm": padding.value === "sm",
      "v-content--padding-md": padding.value === "md",
      "v-content--padding-lg": padding.value === "lg",
      "v-content--w-full": wFull.value,
      "v-content--h-full": hFull.value,
      "v-content--all-distr": allDistr.value,
      "v-content--scroll": scroll.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import "content";
</style>
