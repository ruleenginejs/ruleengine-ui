<script>
export default {
  name: 'v-action-list'
};
</script>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  vertical: {
    type: Boolean,
    default: false
  }
});

const cssClasses = computed(() => ({
  'v-action-list--horizontal': !props.vertical,
  'v-action-list--vertical': props.vertical
}));
</script>

<template>
  <div class="v-action-list" :class="cssClasses">
    <slot></slot>
  </div>
</template>

<style>
@import 'action-list';
</style>
