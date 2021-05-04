<template>
  <div class="v-input-layout" :class="wrapClasses">
    <input
      class="v-input"
      :class="inputClasses"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
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
    type: {
      type: String,
      default: "text"
    },
    className: {
      type: String,
      default: null
    },
    iconClickable: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:modelValue", "icon-click"],
  setup(props, { emit, slots }) {
    const { modelValue, iconClickable, className, disabled, readonly } = toRefs(
      props
    );

    const value = computed({
      get: () => modelValue.value,
      set: (val) => emit("update:modelValue", val)
    });

    const hasIcon = computed(() => !!slots.icon);

    const iconClasses = computed(() => ({
      "v-input__icon--clickable":
        !disabled.value && !readonly.value && iconClickable.value
    }));

    const inputClasses = computed(() => ({
      "v-input--icon": hasIcon.value
    }));

    const wrapClasses = computed(() => ({
      [className.value]: !!className.value,
      "v-input-layout--disabled": disabled.value
    }));

    const onIconClick = () => {
      if (!iconClickable.value || disabled.value || readonly.value) return;
      emit("icon-click");
    };

    return {
      value,
      iconClasses,
      onIconClick,
      hasIcon,
      inputClasses,
      wrapClasses
    };
  }
};
</script>

<style>
@import "input";
</style>
