import { watch, onMounted, onBeforeUnmount } from "vue";
import Split from "split.js";

function gutter(i, gutterDirection) {
  const gut = document.createElement('div')
  gut.className = `v-gutter v-gutter--${gutterDirection}`
  return gut;
}

function elementStyle(dimension, size, gutterSize) {
  return {
    'flex-basis': `calc(${size}% - ${gutterSize}px)`
  }
}

function gutterStyle(dimension, gutterSize) {
  return {
    'flex-basis': `${gutterSize}px`,
  }
}

export default function useSplit(panes, emit, options) {
  const {
    vertical,
    gutterSize,
    expandToMin,
    snapOffset,
    minSize,
    minSizes,
    sizes
  } = options;

  let split = null;

  const onDrag = (e) => emit("drag", e);
  const onDragStart = (e) => emit("drag-start", e);
  const onDragEnd = (e) => emit("drag-end", e);

  const initSplit = () => {
    const paneElements = panes.map(({ paneElement }) => paneElement);

    split = Split(
      paneElements,
      {
        direction: vertical.value ? "horizontal" : "vertical",
        gutter,
        gutterSize: gutterSize.value,
        expandToMin: expandToMin.value,
        sizes: sizes.value ?? undefined,
        minSize: minSizes.value ?? minSize.value,
        snapOffset: snapOffset.value,
        elementStyle,
        gutterStyle,
        onDrag,
        onDragStart,
        onDragEnd
      }
    );
  };

  const removeSplit = () => {
    if (split) {
      split.destroy();
      split = null;
    }
  }

  watch([
    vertical,
    gutterSize,
    expandToMin,
    snapOffset,
    minSize,
    minSizes,
    sizes
  ], () => {
    removeSplit();
    initSplit();
  });

  onMounted(() => {
    initSplit();
  });

  onBeforeUnmount(() => {
    removeSplit();
  })
}
