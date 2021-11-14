<script>
export default {
  name: "v-action-item"
}
</script>

<script setup>
defineProps({
  tag: {
    type: String,
    default: "a"
  },
  icon: {
    type: String,
    default: null
  },
  title: {
    type: String,
    default: null
  },
  tabIndex: {
    type: Number,
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["click"])

function onClick(e) {
  emit("click", e);
}
</script>

<template>
  <component
    class="v-action-item"
    :class="{
      'v-action-item--with-label': $slots['default'],
      'v-action-item--disabled': disabled,
    }"
    :is="tag"
    :title="title"
    :tabindex="disabled ? null : tabIndex"
    @click="disabled ? null : onClick"
    @keyup.space.enter="disabled ? null : onClick"
  >
    <slot name="icon">
      <span v-if="icon" :class="`codicon codicon-${icon}`"></span>
    </slot>
    <span v-if="$slots['default']" class="v-action-item__label">
      <slot></slot>
    </span>
  </component>
</template>

<style>
@import "v-action-item";
</style>
