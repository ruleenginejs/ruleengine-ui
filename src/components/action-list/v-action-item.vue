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
    default: 0
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
    :class="{ 'v-action-item--with-label': $slots['default'] }"
    :is="tag"
    :title="title"
    :tabindex="tabIndex"
    @click="onClick"
    @keyup.space.enter="onClick"
  >
    <slot name="icon">
      <span v-if="icon" :class="`codicon codicon-${icon}`"></span>
    </slot>
    <div v-if="$slots['default']" class="v-action-item__label">
      <slot></slot>
    </div>
  </component>
</template>

<style>
@import "v-action-item";
</style>
