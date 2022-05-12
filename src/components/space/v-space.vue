<template>
  <component class="v-space" :is="tag" />
</template>

<script>
export default {
  name: 'v-space',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  }
};
</script>

<style>
@import 'space';
</style>
