<template>
  <component class="v-fieldset" :class="cssClasses" :is="tag">
    <div v-if="label" class="v-fieldset__label">{{ label }}</div>
    <slot />
  </component>
</template>

<script>
import { toRefs, computed } from "vue";

export default {
  name: "v-fieldset",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    label: {
      type: String,
      default: null
    },
    tBorder: {
      type: Boolean,
      default: false
    },
    bBorder: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const { padding, tBorder, bBorder } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-fieldset--t-border": tBorder.value,
      "v-fieldset--b-border": bBorder.value,
      "v-fieldset--padding": padding.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import "fieldset";
</style>
