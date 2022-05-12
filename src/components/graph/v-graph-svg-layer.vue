<template>
  <div class="v-graph-canvas__layer v-graph-canvas__svg-layer" ref="container">
    <slot />
  </div>
</template>

<script>
import { provide, toRefs } from 'vue';
import useSvg from './composables/use-svg';

export default {
  name: 'v-graph-svg-layer',
  props: {
    translateX: {
      type: Number,
      default: 0
    },
    translateY: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const { translateX, translateY, width, height, scale } = toRefs(props);

    const svg = useSvg({
      translateX,
      translateY,
      width,
      height,
      scale
    });
    const { container } = svg;

    provide('svg', svg);

    return {
      container
    };
  }
};
</script>
