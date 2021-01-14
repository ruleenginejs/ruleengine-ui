export default function useNodeDraggable(position, onSelect = null) {
  const onDragStart = () => {
  }

  const onDrag = () => {
  }

  const onDragEnd = () => {
    onSelect?.();
  }

  const draggableCallbacks = {
    dragStart: onDragStart,
    drag: onDrag,
    dragEnd: onDragEnd
  };

  return {
    draggableCallbacks
  }
}
