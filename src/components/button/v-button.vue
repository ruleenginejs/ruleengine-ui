<template>
  <component
    :is="tag"
    class="v-button"
    :class="cssClasses"
    :tabindex="disabled ? -1 : tabIndex"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-button",
  props: {
    tag: {
      type: String,
      default: "a"
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    secondary: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const { disabled, secondary } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-button--disabled": disabled.value,
      "v-button--default": !secondary.value,
      "v-button--secondary": secondary.value
    }));

    const stopEvent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onClick = (e) => {
      if (disabled.value) {
        stopEvent(e);
        return;
      }
      emit("click", e);
    };

    return {
      cssClasses,
      onClick
    };
  }
};
</script>

<style>
@import "button";
</style>
