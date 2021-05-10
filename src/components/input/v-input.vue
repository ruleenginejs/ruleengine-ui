<template>
  <div class="v-input-layout" :class="layoutClasses">
    <input
      ref="inputEl"
      class="v-input"
      :class="{ 'v-input--icon': $slots['icon'] }"
      v-model="value"
      v-bind="$attrs"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :tabindex="tabIndex"
    />
    <span
      v-if="$slots['icon']"
      class="v-input__icon"
      :class="iconClasses"
      @click="onIconClick"
    >
      <slot name="icon" />
    </span>
  </div>
</template>

<script>
import { computed, ref, toRefs } from "vue";

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
    tabIndex: {
      type: Number,
      default: 0
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
  setup(props, { emit }) {
    const { modelValue, iconClickable, className, disabled, readonly } = toRefs(
      props
    );
    const inputEl = ref(null);

    const value = computed({
      get: () => modelValue.value,
      set: (val) => emit("update:modelValue", val)
    });

    const iconClasses = computed(() => ({
      "v-input__icon--clickable":
        !disabled.value && !readonly.value && iconClickable.value
    }));

    const layoutClasses = computed(() => ({
      [className.value]: !!className.value,
      "v-input-layout--disabled": disabled.value,
      "v-input-layout--readonly": readonly.value
    }));

    const onIconClick = (e) => {
      if (!iconClickable.value || disabled.value || readonly.value) return;
      emit("icon-click", e);
    };

    return {
      value,
      inputEl,
      iconClasses,
      layoutClasses,
      onIconClick
    };
  }
};
</script>

<style>
@import "input";
</style>
