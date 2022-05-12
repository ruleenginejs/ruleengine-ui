<template>
  <div class="v-action" :class="cssClasses" @click="onClick">
    <slot />
  </div>
</template>

<script>
import { computed, toRefs } from 'vue';

export default {
  name: 'v-action',
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const { disabled } = toRefs(props);

    const onClick = () => {
      if (disabled.value) return;
      emit('click');
    };

    const cssClasses = computed(() => ({
      'v-action--disabled': disabled.value
    }));

    return {
      onClick,
      cssClasses
    };
  }
};
</script>

<style>
@import 'action';
</style>
