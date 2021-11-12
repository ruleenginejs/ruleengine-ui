<script>
export default {
  name: "v-floating-toolbar"
}
</script>

<script setup>
import { computed, toRefs } from "vue";
import VIconGripper from "../icons/v-icon-gripper.vue";
import useFloatingToolbar from "./use-floating-toolbar";

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  x: {
    type: Number,
    default: 0
  },
  y: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits([
  "update:x",
  "update:y"
]);

const { x, y, fixed, vertical } = toRefs(props);
const { styles } = useFloatingToolbar({ x, y, emit });

const cssClasses = computed(() => ({
  "v-floating-toolbar--fixed": fixed.value,
  "v-floating-toolbar--horizontal": !vertical.value,
  "v-floating-toolbar--vertical": vertical.value
}));
</script>

<template>
  <div class="v-floating-toolbar" :class="cssClasses" :style="styles">
    <div class="v-floating-toolbar__drag-area">
      <v-icon-gripper />
    </div>
    <div class="v-floating-toolbar__container">
      <slot></slot>
    </div>
  </div>
</template>

<style>
@import "floating-toolbar";
</style>
