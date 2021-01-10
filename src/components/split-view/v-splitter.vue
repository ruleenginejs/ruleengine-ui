<template>
  <div
    class="v-splitter"
    :class="{ 'v-splitter--disabled': disabled }"
    @mousedown="onMouseDown"
    ref="splitter"
  ></div>
</template>

<script>
import { inject, ref, toRefs } from "vue";

function setBodyCursor() {
  document.body.classList.add("v-splitter-body-cursor");
}

function removeBodyCursor() {
  document.body.classList.remove("v-splitter-body-cursor");
}

export default {
  name: "v-splitter",
  props: {
    index: {
      type: Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { disabled, index } = toRefs(props);
    const splitter = ref(null);

    const moveStart = inject("movestart");
    const move = inject("move");
    const moveEnd = inject("moveend");

    let mouseDown = false;
    let dragging = false;

    const getCoords = ({ clientX, clientY }) => {
      const rect = splitter.value?.getBoundingClientRect();
      return {
        x: clientX - rect?.left ?? 0,
        y: clientY - rect?.top ?? 0
      };
    };

    const onMouseDown = () => {
      if (disabled.value) return;

      bindEvents();
      setBodyCursor();
      mouseDown = true;

      if (moveStart) {
        moveStart(index.value);
      }
    };

    const onMouseMove = (event) => {
      if (disabled.value) return;

      if (mouseDown) {
        event.preventDefault();
        dragging = true;

        if (move) {
          move(index.value, getCoords(event));
        }
      }
    };

    const onMouseUp = () => {
      if (disabled.value) return;

      if (dragging && moveEnd) {
        moveEnd(index.value);
      }

      mouseDown = false;
      dragging = false;
      removeBodyCursor();
      unbindEvents();
    };

    function bindEvents() {
      document.addEventListener("mousemove", onMouseMove, {
        passive: false
      });
      document.addEventListener("mouseup", onMouseUp);
    }

    function unbindEvents() {
      document.removeEventListener("mousemove", onMouseMove, {
        passive: false
      });
      document.removeEventListener("mouseup", onMouseUp);
    }

    return {
      splitter,
      onMouseDown
    };
  }
};
</script>

<style>
@import "splitter";
</style>
