<script>
export default {
  name: "v-floating-toolbar"
}
</script>

<script setup>
import { computed, toRefs } from "vue";
import useFloatingToolbar from "./use-floating-toolbar";
import VFloatingToolbarInternal from "./v-floating-toolbar-internal.vue";

const props = defineProps({
  container: {
    type: [HTMLElement, String],
    default: null
  },
  fixed: {
    type: Boolean,
    default: false
  },
  vertical: {
    type: Boolean,
    default: false
  },
  invalidate: {
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
  "update:y",
  "update:invalidate",
  "moveend"
]);

const {
  x, y,
  fixed,
  vertical,
  invalidate,
  container
} = toRefs(props);

const {
  targetElement,
  toolbarRef,
  styles,
  draggableCallbacks
} = useFloatingToolbar({
  x, y,
  container,
  fixed,
  vertical,
  invalidate,
  emit
});

const cssClasses = computed(() => ({
  "v-floating-toolbar--fixed": fixed.value,
  "v-floating-toolbar--horizontal": !vertical.value,
  "v-floating-toolbar--vertical": vertical.value
}));
</script>

<template>
  <teleport v-if="targetElement" :to="targetElement">
    <v-floating-toolbar-internal
      ref="toolbarRef"
      :class="cssClasses"
      :style="styles"
      :draggable-callbacks="draggableCallbacks"
    >
      <slot></slot>
    </v-floating-toolbar-internal>
  </teleport>
  <v-floating-toolbar-internal
    v-else
    ref="toolbarRef"
    :class="cssClasses"
    :style="styles"
    :draggable-callbacks="draggableCallbacks"
  >
    <slot></slot>
  </v-floating-toolbar-internal>
</template>

<style>
@import "floating-toolbar";
</style>
