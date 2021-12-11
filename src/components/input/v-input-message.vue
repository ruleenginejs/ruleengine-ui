<script>
export default {
  name: "v-input-message"
}
</script>

<script setup>
import { computed, toRefs } from "vue";
import { VDropdown } from "../dropdown/index";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  anchor: {
    type: String,
    default: null
  },
  info: {
    type: Boolean,
    default: false
  },
  warning: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  }
});

const { info, warning, error } = toRefs(props);

const cssClasses = computed(() => ({
  "v-input-message--info": info.value,
  "v-input-message--warning": warning.value,
  "v-input-message--error": error.value
}));
</script>

<template>
  <v-dropdown
    :visible="visible"
    :anchor="anchor"
    :offset-y="-1"
    anchor-constraint
    action-on-scrolling="update"
  >
    <div class="v-input-message" :class="cssClasses">
      <slot></slot>
    </div>
  </v-dropdown>
</template>

<style>
@import "input-message";
</style>
