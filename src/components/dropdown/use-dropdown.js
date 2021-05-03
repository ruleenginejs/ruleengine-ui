import { watch, watchEffect, onMounted, onBeforeUnmount, ref, nextTick } from "vue";
import { getScrollParent } from "@/utils/scroll";
import DropdownLayout from "./dropdown-layout";
import ScrollTrigger from "./scroll-trigger";

export default function useDropdown({
  visible,
  anchor,
  emit,
  maxWidth,
  maxHeigth,
  minWidth,
  offsetX,
  offsetY,
  anchorConstraint
}) {
  const dropdown = ref(null);
  const layout = new DropdownLayout(dropdown);

  const onMouseEnter = () => {
    layout.update();
  };

  watchEffect(() => {
    layout.setMaxWidth(maxWidth.value)
      .setMaxHeight(maxHeigth.value)
      .setMinWidth(minWidth.value)
      .setOffsetX(offsetX.value)
      .setOffsetY(offsetY.value)
      .setAnchorConstraint(anchorConstraint.value)
  });

  watch(anchor, () => {
    destroyScrollTrigger();
    if (visible.value) {
      updateDropdown();
    }
  });

  onMounted(() => {
    if (visible.value) {
      updateDropdown();
    }
  });

  onBeforeUnmount(() => {
    destroyScrollTrigger();
  });

  watch(visible, () => {
    if (visible.value) {
      nextTick(() => {
        if (visible.value) {
          updateDropdown();
        } else {
          destroyScrollTrigger();
        }
      });
    } else {
      destroyScrollTrigger();
    }
  });

  function updateDropdown() {
    layout.setAnchor(getAnchorElement()).update();
    startScrollTrigger();
  }

  function closeDropdown() {
    emit("update:visible", false);
  }

  let scrollTrigger = null;
  function startScrollTrigger() {
    if (!scrollTrigger) {
      const scrollParentEl = getAnchorScrollParent();
      if (scrollParentEl) {
        scrollTrigger = new ScrollTrigger(scrollParentEl, closeDropdown);
      }
    }
    scrollTrigger?.start();
  }

  function destroyScrollTrigger() {
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
    onMouseEnter
  }
}
