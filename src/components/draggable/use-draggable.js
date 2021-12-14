import Point from "@/utils/point";
import { ref, computed } from "vue";

export default function useDraggable({ clickTolerance, fixed, emit }) {
  let _startPosition = null;
  let _offsetPoint = null;
  let _parentOffsetPoint = null;
  let _dragStarted = false;

  const positionX = ref(0);
  const positionY = ref(0);
  const moving = ref(false);
  const elementRef = ref(null);

  const draggableCallbacks = {
    dragStart: onDragStart,
    drag: onDrag,
    dragEnd: onDragEnd
  };

  const positionStyle = computed(() => ({
    top: `${positionY.value}px`,
    left: `${positionX.value}px`
  }));

  function onDragStart(e) {
    _startPosition = Point.toPoint(e.clientX, e.clientY);
    _offsetPoint = getElementOffset(_startPosition);
    _parentOffsetPoint = fixed.value ? Point.zero() : getParentOffset();
    _dragStarted = true;

    emit("drag-start", e);
  }

  function onDrag(e) {
    if (!_dragStarted) {
      return;
    }

    const mousePosition = Point.toPoint(e.clientX, e.clientY);
    if (isClickValid(mousePosition)) {
      return;
    }

    moving.value = true;
    updatePosition(mousePosition);
    emit("drag", e);
  }

  function onDragEnd(e) {
    const mousePosition = Point.toPoint(e.clientX, e.clientY);
    const isClick = isClickValid(mousePosition);

    emit("drag-end", {
      event: e,
      isClick
    });

    if (isClick) {
      emit("click", e);
    } else {
      emit("moved", e);
    }

    moving.value = false;
    resetPosition();

    _startPosition = null;
    _offsetPoint = null;
    _parentOffsetPoint = null;
    _dragStarted = false;
  }

  function isClickValid(newPosition) {
    return _startPosition && newPosition.distanceTo(_startPosition) <= clickTolerance.value;
  }

  function updatePosition(mousePosition) {
    positionX.value = mousePosition.x - _offsetPoint.x - _parentOffsetPoint.x;
    positionY.value = mousePosition.y - _offsetPoint.y - _parentOffsetPoint.y;
  }

  function resetPosition() {
    positionX.value = 0;
    positionY.value = 0;
  }

  function getElementOffset(startPosition) {
    const elementRect = elementRef.value?.getBoundingClientRect();
    const offsetX = startPosition.x - (elementRect?.left ?? 0);
    const offsetY = startPosition.y - (elementRect?.top ?? 0);
    return Point.toPoint(offsetX, offsetY);
  }

  function getParentOffset() {
    if (!elementRef.value) return Point.zero();
    const parentRelativeEl = getClosestRelativeAncestor(elementRef.value);
    if (!parentRelativeEl) return Point.zero();
    const { top, left } = parentRelativeEl.getBoundingClientRect();
    return Point.toPoint(left, top);
  }

  function getClosestRelativeAncestor(el) {
    let p = el.parentElement;
    while (p && getCssPosition(p) === "static") {
      p = p.parentElement;
    }
    return p;
  }

  function getCssPosition(el) {
    return window.getComputedStyle(el, null).getPropertyValue("position");
  }

  return {
    positionStyle,
    moving,
    elementRef,
    draggableCallbacks
  };
}
