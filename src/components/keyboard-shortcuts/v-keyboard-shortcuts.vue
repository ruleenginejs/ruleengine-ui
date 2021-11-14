<script>
export default {
  name: "v-keyboard-shortcuts"
}
</script>

<script setup>
import { toRefs, computed } from "vue";
import VKeybindingLabel from "../keybinding-label/v-keybinding-label.vue";

const props = defineProps({
  value: {
    type: Array,
    default: () => []
  },
  keyValueSeparator: {
    type: String,
    default: undefined
  },
  keySeparator: {
    type: String,
    default: undefined
  },
  labelAlign: {
    type: String,
    default: "left"
  }
});

const { labelAlign } = toRefs(props);
const cssClasses = computed(() => ({
  "v-keyboard-shortcuts--label-left": labelAlign.value === "left",
  "v-keyboard-shortcuts--label-right": labelAlign.value === "right"
}));
</script>

<template>
  <div class="v-keyboard-shortcuts" :class="cssClasses">
    <dl v-for="(item, index) in value" :key="index">
      <dt>{{ item.title }}</dt>
      <dd>
        <v-keybinding-label
          :value="item.key"
          :value-separator="keyValueSeparator"
          :separator="keySeparator"
        />
      </dd>
    </dl>
  </div>
</template>

<style>
@import "keyboard-shortcuts";
</style>
