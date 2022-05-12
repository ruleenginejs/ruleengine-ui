<template>
  <div class="v-split-pane" ref="pane">
    <slot />
  </div>
</template>

<script>
import { toRefs } from 'vue';
import usePane from './use-pane';

export default {
  name: 'v-split-pane',
  props: {
    id: {
      type: [String, Number],
      default: null
    },
    size: {
      type: [String, Number],
      default: 0
    },
    minSize: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    fallbackExpandSize: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const { id, size, minSize, disabled, fallbackExpandSize } = toRefs(props);

    const { pane } = usePane({
      id,
      size,
      minSize,
      disabled,
      fallbackExpandSize
    });

    return {
      pane
    };
  }
};
</script>
