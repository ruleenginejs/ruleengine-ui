<template>
  <div
    class="v-sidebar"
    :class="{
      'v-sidebar--rt-border': rtBorder,
      'v-sidebar--lt-border': ltBorder
    }"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "v-sidebar",
  props: {
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
@import "sidebar";
</style>
