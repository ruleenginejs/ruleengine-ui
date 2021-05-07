<template>
  <div class="v-list-item" :class="cssClasses" @click="onClick">
    <div v-if="icon" class="v-list-item__icon" :style="{ color: iconColor }">
      <component :is="icon" />
    </div>
    <div class="v-list-item__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-list-item",
  props: {
    text: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    iconColor: {
      type: String,
      default: null
    },
    selected: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ["click"],
  setup(props, { emit }) {
    const { selected, focused, disabled } = toRefs(props);

    const cssClasses = computed(() => ({
      "v-list-item--focused": focused.value,
      "v-list-item--selected": selected.value,
      "v-list-item--disabled": disabled.value
    }));

    const onClick = (e) => {
      emit("click", e);
    };

    return {
      cssClasses,
      onClick
    };
  }
};
</script>
