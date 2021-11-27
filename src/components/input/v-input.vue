<template>
  <div class="v-input-layout" :class="layoutClasses">
    <input
      ref="inputEl"
      class="v-input"
      :class="{
        'v-input--icon': $slots['icon'],
        'v-input--info': info,
        'v-input--warning': warning,
        'v-input--error': error
      }"
      v-model="value"
      v-bind="$attrs"
      :id="inputId"
      :type="type"
      :disabled="disabled"
      :readonly="readonly"
      :tabindex="tabIndex"
      @focusin="focused = true"
      @focusout="focused = false"
    />
    <span v-if="$slots['icon']" class="v-input__icon" :class="iconClasses" @click="onIconClick">
      <slot name="icon"></slot>
    </span>
  </div>
  <v-input-message
    v-if="canShowMessage"
    :visible="focused"
    :anchor="inputId"
    :info="info"
    :warning="warning"
    :error="error"
  >{{ message }}</v-input-message>
</template>

<script>
import { computed, ref, toRefs, getCurrentInstance } from "vue";
import VInputMessage from "./v-input-message.vue";

export default {
  name: "v-input",
  inheritAttrs: false,
  components: {
    VInputMessage
  },
  props: {
    modelValue: {
      type: [String, Number],
      default: null
    },
    id: {
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
    },
    message: {
      type: String,
      default: null
    }
  },
  emits: ["update:modelValue", "icon-click"],
  setup(props, { emit }) {
    const {
      id,
      modelValue,
      className,
      disabled,
      readonly,
      message,
      iconClickable
    } = toRefs(props);

    const instance = getCurrentInstance();
    const uid = instance.uid;
    const inputEl = ref(null);
    const focused = ref(false);

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

    const inputId = computed(() => {
      if (id.value) {
        return id.value;
      } else if (message.value) {
        return `__v-input-${uid}`;
      } else {
        return null;
      }
    });

    const canShowMessage = computed(() =>
      message.value && !disabled.value && !readonly.value);

    const onIconClick = (e) => {
      if (!iconClickable.value || disabled.value || readonly.value) {
        return;
      }
      emit("icon-click", e);
    };

    return {
      value,
      inputEl,
      inputId,
      focused,
      canShowMessage,
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
