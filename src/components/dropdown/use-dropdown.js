import RectObserver from "@/utils/rect-observer";
import { isDefined } from "@/utils/types";
import { watch, onMounted, onBeforeUnmount, computed, ref, nextTick } from "vue";

export default function useDropdown({
  visible,
  anchor,
  maxWidth: userMaxWidth,
  maxHeigth: userMaxHeigth,
  minWidth: userMinWidth,
  stretchToAnchor
}) {
  const dropdown = ref(null);
  const top = ref(0);
  const left = ref(0);
  const minWidth = ref(null);
  const maxHeigth = ref(null);
  const maxWidth = ref(null);
  let anchorObserver = null;

  const computedMinWidth = computed(
    () => stretchToAnchor.value ? minWidth.value : userMinWidth.value
  );
  const computedMaxWidth = computed(
    () => isDefined(userMaxWidth.value) ? userMaxWidth.value : maxWidth.value
  );
  const computedMaxHeight = computed(
    () => isDefined(userMaxHeigth.value) ? userMaxHeigth.value : maxHeigth.value
  );

  const dropdownStyles = computed(() => ({
    top: `${top.value}px`,
    left: `${left.value}px`,
    maxWidth: isDefined(computedMaxWidth.value) ? `${computedMaxWidth.value}px` : null,
    maxHeigth: isDefined(computedMaxHeight.value) ? `${computedMaxHeight.value}px` : null,
    minWidth: isDefined(computedMinWidth.value) ? `${computedMinWidth.value}px` : null,
  }));

  onMounted(() => {
    if (visible.value) {
      updateDropdown();
    }
  });

  onBeforeUnmount(() => {
    anchorObserver?.destroy();
    anchorObserver = null;
  });

  watch(visible, () => {
    if (visible.value) {
      nextTick(() => {
        if (visible.value) {
          updateDropdown();
        } else {
          stopAnchorObserver();
        }
      });
    } else {
      stopAnchorObserver();
    }
  });

  watch(anchor, () => {
    anchorObserver?.destroy();
    anchorObserver = null;

    if (visible.value) {
      updateDropdown();
    }
  });

  function updateDropdown() {
    updatePosition();
    startAnchorObserver();
  }

  function updatePosition() {
    const anchorEl = getAnchorElement();
    if (!anchorEl || !dropdown.value) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const dropdownRect = dropdown.value.getBoundingClientRect();
    const winHeight = window.innerHeight;

    if (stretchToAnchor.value) {
      minWidth.value = anchorRect.width;
    }

    left.value = anchorRect.left;
    top.value = anchorRect.top + anchorRect.height;

    if ((top.value + dropdownRect.height) > winHeight) {
      top.value = anchorRect.top - dropdownRect.height;
    }
  }

  function getAnchorElement() {
    if (anchor.value) {
      return document.getElementById(anchor.value);
    }
    return null;
  }

  function startAnchorObserver() {
    const anchorEl = getAnchorElement();
    if (!anchorObserver && anchorEl) {
      anchorObserver = new RectObserver(anchorEl, updatePosition);
    }
    anchorObserver?.start();
  }

  function stopAnchorObserver() {
    anchorObserver?.stop();
  }

  return {
    dropdownStyles,
    dropdown
  }
}
