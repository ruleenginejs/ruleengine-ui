/* eslint-disable no-unused-vars */
import { ref } from "vue";

export default function useNodeDraggable() {
  const dragging = ref(false);

  const onDragStart = () => {
  }

  const onDrag = () => {
  }

  const onDragEnd = () => {
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
