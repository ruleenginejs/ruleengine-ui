import { watch, onMounted, onBeforeUnmount } from "vue";
import Split from "split.js";

function isDefined(value) {
  return value !== null && value !== undefined;
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
  let gutterElements = [];

  const initSplit = () => {
    split = Split(
      getPaneElements(),
      {
        direction: vertical.value ? "horizontal" : "vertical",
        gutter,
        gutterSize: 0,
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

    updateGutter(split.getSizes());
  };

  const removeSplit = () => {
    if (split) {
      split.destroy();
      split = null;
      gutterElements = [];
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

  function getPaneElements() {
    return panes.map(({ paneElement }) => paneElement);
  }

  function gutter(i, gutterDirection) {
    const gut = document.createElement('div')
    gut.className = `v-gutter v-gutter--${gutterDirection}`
    gutterElements.push(gut);
    return gut;
  }

  function elementStyle(dimension, size) {
    return {
      'flex-basis': `${size}%`
    }
  }

  function gutterStyle(dimension) {
    return {
      [dimension]: `${gutterSize.value}px`,
      [dimension === "width" ? "left" : "top"]: "0%"
    }
  }

  function updateGutter(paneSizes) {
    const prop = vertical.value ? "left" : "top";
    const halfGutSize = (gutterSize.value ?? 0) / 2;
    let accumulatedSize = 0;

    for (let i = 0; i < gutterElements.length; i++) {
      const gutterElement = gutterElements[i];

      if (isDefined(paneSizes[i])) {
        accumulatedSize += paneSizes[i];
        gutterElement.style[prop] = `calc(${accumulatedSize}% - ${halfGutSize}px)`;
      }
    }
  }

  function onDrag(e) {
    updateGutter(e);
    emit("drag", e);
  }

  function onDragStart(e) {
    updateGutter(e);
    emit("drag-start", e)
  }

  function onDragEnd(e) {
    updateGutter(e);
    emit("drag-end", e)
  }

  function collapse(i) {
    if (split) {
      split.collapse(i);
      updateGutter(split.getSizes());
    }
  }

  return {
    collapse
  };
}
