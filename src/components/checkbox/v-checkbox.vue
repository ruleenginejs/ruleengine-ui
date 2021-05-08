<template>
  <div class="v-checkbox" :class="cssClasses">
    <label class="v-checkbox__wrap">
      <input
        ref="inputEl"
        type="checkbox"
        class="v-checkbox__input"
        v-model="checked"
        v-bind="$attrs"
        :disabled="disabled"
        :readonly="readonly"
        :tabindex="tabIndex"
      />
      <div class="v-checkbox__custom">
        <slot v-if="checked" name="icon">
          <v-icon-checkmark />
        </slot>
      </div>
    </label>
  </div>
</template>

<script>
import { computed, ref, toRefs } from "vue";
import { VIconCheckmark } from "@/components/icons";

export default {
  name: "v-checkbox",
  inheritAttrs: false,
  components: {
    VIconCheckmark
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: null
    },
    tabIndex: {
      type: Number,
      default: 0
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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { modelValue, className, disabled, readonly } = toRefs(props);
    const inputEl = ref(null);

    const checked = computed({
      get: () => modelValue.value,
      set: (val) => emit("update:modelValue", val)
    });

    const cssClasses = computed(() => ({
      [className.value]: !!className.value,
      "v-checkbox--disabled": disabled.value,
      "v-checkbox--readonly": readonly.value,
      "v-checkbox--checked": checked.value
    }));

    return {
      checked,
      inputEl,
      cssClasses
    };
  }
};
</script>

<style>
@import "checkbox";
</style>
