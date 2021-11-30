import Point from "@/utils/point";
import { ref, computed } from "vue";

export default function useDraggable({ clickTolerance, movable, emit }) {
  let _startPosition = null;
  let _offsetPoint = null;
  let _dragStarted = false;

  const positionX = ref(0);
  const positionY = ref(0);
  const moving = ref(false);
  const containerRef = ref(null);

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
    _offsetPoint = getContainerOffset(_startPosition);
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

    emit("drag-end", e, isClick);
    if (isClick) {
      emit("click", e);
    }

    moving.value = false;

    if (!movable.value) {
      resetPosition();
    }

    _startPosition = null;
    _offsetPoint = null;
    _dragStarted = false;
  }

  function isClickValid(newPosition) {
    return _startPosition && newPosition.distanceTo(_startPosition) <= clickTolerance.value;
  }

  function updatePosition(mousePosition) {
    positionX.value = mousePosition.x - _offsetPoint.x;
    positionY.value = mousePosition.y - _offsetPoint.y;
  }

  function resetPosition() {
    positionX.value = 0;
    positionY.value = 0;
  }

  function getContainerOffset(startPosition) {
    const containerRect = containerRef.value?.getBoundingClientRect();
    const offsetX = startPosition.x - (containerRect?.left ?? 0);
    const offsetY = startPosition.y - (containerRect?.top ?? 0);
    return Point.toPoint(offsetX, offsetY);
  }

  return {
    positionStyle,
    moving,
    containerRef,
    draggableCallbacks
  };
}
