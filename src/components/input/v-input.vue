<template>
  <div class="v-input-wrap" :class="className">
    <input
      class="v-input"
      :class="inputClasses"
      v-model="value"
      v-bind="$attrs"
    />
    <span
      v-if="hasIcon"
      @click="onIconClick"
      class="v-input__icon"
      :class="iconClasses"
    >
      <slot name="icon" />
    </span>
  </div>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-input",
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    className: {
      type: String,
      default: null
    },
    iconClickable: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit, slots }) {
    const { modelValue, iconClickable } = toRefs(props);

    const value = computed({
      get: () => modelValue.value,
      set: (val) => emit("update:modelValue", val)
    });

    const hasIcon = computed(() => !!slots.icon);

    const iconClasses = computed(() => ({
      "v-input__icon--clickable": iconClickable.value
    }));

    const inputClasses = computed(() => ({
      "v-input--icon": hasIcon.value
    }));

    const onIconClick = () => {
      if (!iconClickable.value) return;
      emit("icon-click");
    };

    return {
      value,
      iconClasses,
      onIconClick,
      hasIcon,
      inputClasses
    };
  }
};
</script>

<style>
@import "input";
</style>
