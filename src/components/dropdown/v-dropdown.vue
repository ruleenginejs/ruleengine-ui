<template>
  <teleport to="body">
    <div
      v-if="visible"
      ref="dropdown"
      :style="dropdownStyles"
      class="v-dropdown v-scrollbar"
      :class="className"
      @mouseenter="onMouseEnter"
      @mousedown="onMouseDown"
    >
      <slot />
    </div>
  </teleport>
</template>

<script>
import { toRefs } from 'vue';
import useDropdown from './use-dropdown';

export default {
  name: 'v-dropdown',
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
    maxHeight: {
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
      type: [String, Object, Array],
      default: null
    },
    anchorConstraint: {
      type: [Boolean, String],
      default: false
    },
    actionOnScrolling: {
      type: [Boolean, String],
      default: 'close'
    },
    preventMouseDown: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const {
      visible,
      anchor,
      maxWidth,
      maxHeight,
      minWidth,
      offsetX,
      offsetY,
      anchorConstraint,
      actionOnScrolling,
      preventMouseDown
    } = toRefs(props);

    const { dropdownStyles, dropdown, onMouseEnter, onMouseDown } = useDropdown(
      {
        visible,
        anchor,
        emit,
        maxWidth,
        maxHeight,
        minWidth,
        offsetX,
        offsetY,
        anchorConstraint,
        actionOnScrolling,
        preventMouseDown
      }
    );

    return {
      dropdownStyles,
      dropdown,
      onMouseEnter,
      onMouseDown
    };
  }
};
</script>

<style>
@import 'dropdown';
</style>
