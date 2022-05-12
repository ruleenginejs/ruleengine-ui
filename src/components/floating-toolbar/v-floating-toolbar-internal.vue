<script>
export default {
  name: 'v-floating-toolbar-internal'
};
</script>

<script setup>
import VIconGripper from '../icons/v-icon-gripper.vue';
import vDraggable from '@/directives/draggable';

defineProps({
  draggableCallbacks: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="v-floating-toolbar">
    <div
      class="v-floating-toolbar__drag-area"
      v-draggable.stop="draggableCallbacks"
    >
      <v-icon-gripper />
    </div>
    <div class="v-floating-toolbar__container">
      <slot></slot>
    </div>
  </div>
</template>
