<template>
  <select
    class="v-select-box"
    :class="cssClasses"
    v-model="value"
    :disabled="disabled"
    :readonly="readonly"
    :tabindex="tabIndex"
  >
    <option
      v-for="optionItem in optionItems"
      :key="optionItem.value"
      :value="optionItem.value"
      :disabled="optionItem.disabled"
    >
      {{ optionItem.text }}
    </option>
  </select>
</template>

<script>
import { computed, toRefs } from "vue";

export default {
  name: "v-select-box",
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null
    },
    valueAsObject: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => []
    },
    valueField: {
      type: String,
      default: "value"
    },
    displayField: {
      type: String,
      default: "text"
    },
    detailField: {
      type: String,
      default: "detail"
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const {
      modelValue,
      valueAsObject,
      className,
      disabled,
      items,
      valueField,
      displayField,
      detailField
    } = toRefs(props);

    const optionItems = computed(() =>
      items.value.map((item) => ({
        value: item[valueField.value],
        text: item[displayField.value],
        detail: item[detailField],
        disabled: !!item.disabled
      }))
    );

    const findItem = (val) => {
      return items.value.find((item) => item[valueField.value] === val);
    };

    const value = computed({
      get: () => {
        if (valueAsObject.value) {
          return modelValue.value?.[valueField.value];
        } else {
          return modelValue.value;
        }
      },
      set: (val) => {
        if (valueAsObject.value) {
          val = findItem(val);
        }
        emit("update:modelValue", val);
      }
    });

    const cssClasses = computed(() => ({
      [className.value]: !!className.value,
      "v-select-box--disabled": disabled.value
    }));

    return {
      value,
      cssClasses,
      optionItems
    };
  }
};
</script>

<style>
@import "select-box";
</style>
