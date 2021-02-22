import { watch, onMounted, onBeforeUnmount, nextTick } from "vue";
import SplitView from "splitview.js";

export default function useSplit(panes, emit, options) {
  const {
    horizontal,
    gutterSize,
    expandToMin,
    snapOffset,
    customGutterClassName
  } = options;

  const resizeCallbacks = {
    resize: onWindowResize
  }

  onMounted(() => {
    nextTick(() => {
      create();
    });
  });

  onBeforeUnmount(() => {
    remove();
  });

  watch([
    horizontal,
    gutterSize,
    expandToMin,
    snapOffset,
    customGutterClassName
  ], () => {
    recreate();
  });

  let instance = null;

  function recreate() {
    remove();
    create();
  }

  function create() {
    instance = SplitView(panes, {
      percent: false,
      direction: horizontal.value ? "horizontal" : "vertical",
      expandToMin: expandToMin.value,
      gutterSize: gutterSize.value,
      snapOffset: snapOffset.value,
      customGutterClassName: customGutterClassName.value
    });
    instance.on("resize", onResize);
    return instance;
  }

  function remove() {
    instance?.destroy();
    instance = null;
  }

  function onResize(percentSizes, sender) {
    emit("resize", { percentSizes, sender });
  }

  function onWindowResize() {
    instance?.invalidateSize();
  }

  function getInstance() {
    return instance;
  }

  return {
    resizeCallbacks,
    getInstance
  }
}
