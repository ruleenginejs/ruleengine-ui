<template>
  <div class="v-split-pane" :class="paneClasses" :style="paneStyles" ref="pane">
    <slot />
  </div>
</template>

<script>
import { computed, inject, onBeforeUnmount, onMounted, ref, toRefs } from "vue";

function minMax(value = null, min = null, max = null) {
  if (!isDefined(value)) {
    return value;
  }
  if (isDefined(min) && value < min) {
    value = min;
  }
  if (isDefined(max) && value > max) {
    value = max;
  }
  return value;
}

function toPx(value = null) {
  if (value !== null && value !== undefined) {
    return `${value}px`;
  }
  return value;
}

function isDefined(value) {
  return value !== null && value !== undefined;
}

export default {
  name: "v-split-pane",
  props: {
    index: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: null
    },
    minSize: {
      type: Number,
      default: 0
    },
    maxSize: {
      type: Number,
      default: null
    }
  },
  setup(props) {
    const { index, size: initialSize, minSize, maxSize } = toRefs(props);
    const pane = ref(null);
    const size = ref(minMax(initialSize.value, minSize.value, maxSize.value));
    const registerPane = inject("registerPane");
    const idx = index.value;

    const instance = {
      canResize(delta) {
        const old = size.value;
        const next = getSafeSize(delta);
        return old !== next;
      },
      resize(delta) {
        size.value = getSafeSize(delta);
      },
      size() {
        return size.value;
      },
      index() {
        return idx;
      },
      originSize() {
        const rect = pane.value?.getBoundingClientRect();
        return rect?.width;
      }
    };

    if (registerPane) {
      registerPane(idx, instance);

      onBeforeUnmount(() => {
        registerPane(idx, null);
      });
    }

    onMounted(() => {
      if (!isDefined(size.value)) {
        updateSizeFromOrigin();
      }
    });

    const paneClasses = computed(() => ({
      "v-split-pane--all-distr": !isDefined(size.value)
    }));

    const paneStyles = computed(() => ({
      width: toPx(size.value)
    }));

    function updateSizeFromOrigin() {
      size.value = instance.originSize();
    }

    function getSafeSize(delta) {
      return minMax(size.value + delta, minSize.value, maxSize.value);
    }

    return {
      pane,
      paneClasses,
      paneStyles
    };
  }
};
</script>

<style>
@import "split-pane";
</style>
