import { watch, watchEffect, onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { getScrollParent } from "@/utils/scroll";
import DropdownLayout from "./dropdown-layout";
import ScrollTrigger from "./scroll-trigger";

export default function useDropdown({
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
}) {
  const dropdown = ref(null);
  const layout = new DropdownLayout(dropdown);

  const onMouseEnter = () => {
    layout.update();
  };

  const onMouseDown = (e) => {
    if (preventMouseDown.value) {
      e.preventDefault();
    }
  };

  watchEffect(() => {
    layout.setMaxWidth(maxWidth.value)
      .setMaxHeight(maxHeight.value)
      .setMinWidth(minWidth.value)
      .setOffsetX(offsetX.value)
      .setOffsetY(offsetY.value)
      .setAnchorConstraint(anchorConstraint.value)
      .update();
  });

  watch(anchor, () => {
    destroyScrollTrigger();
    if (visible.value) {
      showDropdown();
    }
  });

  onMounted(() => {
    if (visible.value) {
      showDropdown();
    }
  });

  onBeforeUnmount(() => {
    destroyScrollTrigger();
  });

  watch(visible, () => {
    if (visible.value) {
      nextTick(() => {
        if (visible.value) {
          showDropdown();
        } else {
          destroyScrollTrigger();
        }
      });
    } else {
      destroyScrollTrigger();
    }
  });

  function showDropdown() {
    layout.setAnchor(getAnchorElement()).update();
    startScrollTrigger();
  }

  function closeDropdown() {
    emit("update:visible", false);
  }

  let scrollTrigger = null;

  function createScrollTrigger() {
    const scrollParentEl = getAnchorScrollParent();
    if (!scrollParentEl) {
      return null;
    }

    const onceRun = actionOnScrolling.value !== "update";
    return new ScrollTrigger(scrollParentEl, () => {
      if (actionOnScrolling.value === "update") {
        layout.update();
      } else if (actionOnScrolling.value === "close") {
        closeDropdown();
      }
    }, onceRun);
  }

  function startScrollTrigger() {
    if (!actionOnScrolling.value) {
      return;
    }
    if (!scrollTrigger) {
      scrollTrigger = createScrollTrigger();
    }
    scrollTrigger?.start();
  }

  function destroyScrollTrigger() {
    if (!actionOnScrolling.value) {
      return;
    }
    scrollTrigger?.destroy();
    scrollTrigger = null;
  }

  function getAnchorElement() {
    if (!anchor.value) return null;
    return document.getElementById(anchor.value);
  }

  function getAnchorScrollParent() {
    const anchorEl = getAnchorElement();
    if (!anchorEl) return null;
    return getScrollParent(anchorEl, false, document);
  }

  return {
    dropdownStyles: layout.styles,
    dropdown,
    onMouseEnter,
    onMouseDown
  }
}
