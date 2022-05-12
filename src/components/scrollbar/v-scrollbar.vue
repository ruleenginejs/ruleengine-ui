<script>
export default {
  name: 'v-scrollbar'
};
</script>

<script setup>
import { toRefs, computed } from 'vue';

const props = defineProps({
  size: {
    type: String,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const { size, disabled } = toRefs(props);

const cssClasses = computed(() => ({
  'v-scrollbar--enabled': !disabled.value,
  'v-scrollbar--disabled': disabled.value,
  'v-scrollbar--md': size.value === 'md',
  'v-scrollbar--sm': size.value === 'sm'
}));
</script>

<template>
  <div class="v-scrollbar" :class="cssClasses">
    <slot></slot>
  </div>
</template>

<style>
@import 'scrollbar';
</style>
