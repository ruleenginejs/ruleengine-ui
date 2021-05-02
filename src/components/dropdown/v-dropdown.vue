<template>
  <teleport to="body">
    <div
      v-if="visible"
      ref="dropdown"
      :style="dropdownStyles"
      class="v-dropdown v-scrollbar"
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
    stretchToAnchor: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const {
      visible,
      anchor,
      maxWidth,
      maxHeigth,
      minWidth,
      stretchToAnchor
    } = toRefs(props);

    const { dropdownStyles, dropdown } = useDropdown({
      visible,
      anchor,
      emit,
      maxWidth,
      maxHeigth,
      minWidth,
      stretchToAnchor
    });

    return {
      dropdownStyles,
      dropdown
    };
  }
};
</script>

<style>
@import "dropdown";
</style>
