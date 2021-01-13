<template>
  <div
    class="v-graph-node"
    :class="{ 'v-graph-node--selected': selected }"
    :style="{ transform: transformStyle }"
    @click="onSelect"
  >
    <div
      class="v-graph-node__header"
      :style="{ backgroundColor: colorStyle }"
      :class="colorClassName"
    >
      <div
        v-if="$slots['header-left-icon']"
        class="v-graph-node__header__icon v-graph-node__header__left"
      >
        <slot name="header-left-icon" />
      </div>
      <div class="v-graph-node__header__label" :title="title">{{ title }}</div>
      <div
        v-if="$slots['header-right-icon']"
        class="v-graph-node__header__icon v-graph-node__header__right"
      >
        <slot name="header-right-icon" />
      </div>
    </div>
    <div class="v-graph-node__content">
      <div
        v-if="$slots['left']"
        class="v-graph-node__part v-graph-node__part--left"
      >
        <slot name="left" />
      </div>
      <div
        v-if="$slots['right']"
        class="v-graph-node__part v-graph-node__part--right"
      >
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";
import usePosition from "./composables/use-position";
import useTransform from "./composables/use-transform";
import usePresetColor from "./composables/use-preset-color";
import useSelect from "./composables/use-select";

const presetColors = ["blue", "green"];
const colorFn = (color) => `v-graph-node__header--${color}`;

export default {
  name: "v-graph-node",
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    title: {
      type: String,
      default: null
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    headerColor: {
      type: String,
      default: null
    }
  },
  emits: ["update:x", "update:y"],
  setup(props, { emit }) {
    const { x, y, headerColor } = toRefs(props);

    const position = usePosition(x, y, emit);
    const transformStyle = useTransform(position);
    const { selected, onSelect } = useSelect();

    const { colorStyle, colorClassName } = usePresetColor(
      headerColor,
      presetColors,
      colorFn
    );

    return {
      transformStyle,
      colorStyle,
      colorClassName,
      selected,
      onSelect
    };
  }
};
</script>

<style>
@import "graph-node";
</style>
