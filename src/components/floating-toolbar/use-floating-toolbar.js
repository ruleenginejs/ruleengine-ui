import { ref, watch, computed } from "vue";

export default function useFloatingToolbar({ x, y, emit }) {
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

  return {
    styles
  }
}
