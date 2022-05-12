<template>
  <div class="v-action-bar" :class="cssClasses">
    <slot />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'v-action-bar',
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
    },
    wFull: {
      type: Boolean,
      default: false
    },
    noOverflow: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { lBorder, rBorder, right, wFull, noOverflow } = toRefs(props);

    const cssClasses = computed(() => ({
      'v-action-bar--l-border': lBorder.value,
      'v-action-bar--r-border': rBorder.value,
      'v-action-bar--right': right.value,
      'v-action-bar--w-full': wFull.value,
      'v-action-bar--no-overflow': noOverflow.value
    }));

    return {
      cssClasses
    };
  }
};
</script>

<style>
@import 'action-bar';
</style>
