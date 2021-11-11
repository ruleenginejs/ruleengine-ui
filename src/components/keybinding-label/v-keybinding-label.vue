<script>
export default {
  name: "v-keybinding-label"
}
</script>

<script setup>
import { toRefs, computed } from "vue";

const props = defineProps({
  value: {
    type: String,
    default: null
  },
  parseSeparator: {
    type: String,
    default: "+"
  },
  separator: {
    type: String,
    default: "+"
  }
});

const { value, parseSeparator } = toRefs(props);
const parts = computed(() => {
  const keyParts = (value.value || "")
    .split(parseSeparator.value)
    .filter((item) => !!item);
  return keyParts;
});
</script>

<template>
  <div v-if="value" class="v-keybinding-label" :title="value">
    <template v-for="(part, index) in parts" :key="index">
      <span v-if="index > 0" class="v-keybinding-label__separator">{{ separator }}</span>
      <span class="v-keybinding-label__key">{{ part }}</span>
    </template>
  </div>
</template>

<style>
@import "keybinding-label";
</style>
