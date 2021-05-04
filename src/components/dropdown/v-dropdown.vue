<template>
  <teleport to="body">
    <div
      v-if="visible"
      ref="dropdown"
      :style="dropdownStyles"
      class="v-dropdown v-scrollbar"
      :class="className"
      @mouseenter="onMouseEnter"
    >
      <slot />
    </div>
  </teleport>
</template>

<script>
import { toRefs } from "vue";
import useDropdown from "./use-dropdown";

export default {
  name: "v-dropdown",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    anchor: {
      type: String,
      default: null
    },
    maxWidth: {
      type: Number,
      default: null
    },
    maxHeigth: {
      type: Number,
      default: null
    },
    minWidth: {
      type: Number,
      default: null
    },
    offsetX: {
      type: Number,
      default: null
    },
    offsetY: {
      type: Number,
      default: null
    },
    className: {
      type: String,
      default: null
    },
    anchorConstraint: {
      type: [Boolean, String],
      default: false
    },
    actionWhenScrolling: {
      type: [Boolean, String],
      default: "close"
    }
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const {
      visible,
      anchor,
      maxWidth,
      maxHeigth,
      minWidth,
      offsetX,
      offsetY,
      anchorConstraint,
      actionWhenScrolling
    } = toRefs(props);

    const { dropdownStyles, dropdown, onMouseEnter } = useDropdown({
      visible,
      anchor,
      emit,
      maxWidth,
      maxHeigth,
      minWidth,
      offsetX,
      offsetY,
      anchorConstraint,
      actionWhenScrolling
    });

    return {
      dropdownStyles,
      dropdown,
      onMouseEnter
    };
  }
};
</script>

<style>
@import "dropdown";
</style>
