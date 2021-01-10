<template>
  <div class="v-tabs v-scrollbar v-scrollbar--sm">
    <slot />
  </div>
</template>

<script>
import { computed, provide, toRefs } from "vue";

export default {
  name: "v-tabs",
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);

    const selectedTab = computed({
      get: () => modelValue.value,
      set: (val) => emit("update:modelValue", val)
    });

    provide("selectedTab", selectedTab);
  }
};
</script>

<style>
@import "tabs";
</style>
