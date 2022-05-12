<template>
  <div
    class="v-sidebar"
    :class="{
      'v-sidebar--w-full': wFull,
      'v-sidebar--h-full': hFull,
      'v-sidebar--rt-border': rtBorder,
      'v-sidebar--lt-border': ltBorder
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'v-sidebar',
  props: {
    wFull: {
      type: Boolean,
      default: false
    },
    hFull: {
      type: Boolean,
      default: false
    },
    ltBorder: {
      type: Boolean,
      default: false
    },
    rtBorder: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style>
@import 'sidebar';
</style>
