import clamp from "@/utils/clamp";
import Point from "@/utils/point";
import { ref, watch, computed } from "vue";

export default function useFloatingToolbar({ container, fixed, x, y, emit }) {
  const toolbarRef = ref(null);
  const positionX = ref(x.value);
  const positionY = ref(y.value);

  watch(x, () => {
    positionX.value = x.value;
  });
  watch(y, () => {
    positionY.value = y.value;
  });
  watch(positionX, () => {
    emit("update:x", positionX.value);
  });
  watch(positionY, () => {
    emit("update:y", positionY.value)
  });

  const styles = computed(() => ({
    top: `${positionY.value}px`,
    left: `${positionX.value}px`
  }));

  const targetElement = computed(() => {
    if (container.value) {
      return container.value === "body" ? document.body : container.value;
    } else if (fixed.value) {
      return document.body;
    } else {
      return null;
    }
  });

  const draggableCallbacks = {
    dragStart: onDragStart,
    drag: onDrag,
    dragEnd: onDragEnd
  }

  let _parentRect = null;
  let _elementRect = null;
  let _offsetPoint = null;

  function onDragStart(e) {
    const el = toolbarRef.value?.$el;
    if (el) {
      _elementRect = el.getBoundingClientRect();
      const elementPosition = Point.toPoint(_elementRect.left, _elementRect.top);
      const startMousePoint = Point.toPoint(e.clientX, e.clientY);
      _offsetPoint = startMousePoint.subtract(elementPosition);
    }

    const parent = el?.parentElement;
    if (parent) {
      _parentRect = parent.getBoundingClientRect();
    }
  }

  function onDrag(e) {
    if (!_parentRect || !_elementRect) {
      return;
    }

    const mousePosition = Point.toPoint(e.clientX, e.clientY);
    const localPosition = toLocalPosition(_parentRect, mousePosition)
      .subtract(_offsetPoint);

    const maxX = _parentRect.width - _elementRect.width;
    const maxY = _parentRect.height - _elementRect.height;

    positionX.value = clamp(0, localPosition.x, maxX);
    positionY.value = clamp(0, localPosition.y, maxY);
  }

  function onDragEnd() {
    _parentRect = null;
    _elementRect = null;
    _offsetPoint = null;
  }

  function toLocalPosition(rect, point) {
    return Point.toPoint(point.x - rect.left, point.y - rect.top);
  }

  return {
    styles,
    targetElement,
    toolbarRef,
    draggableCallbacks
  }
}
