import { reactive, watch } from "vue";

export default function usePosition(x, y, emit) {
  const position = reactive({
    x: x.value,
    y: y.value
  });

  watch([x, y], () => {
    position.x = x.value;
    position.y = y.value;
  })

  watch(position, () => {
    emit("update:x", position.x);
    emit("update:y", position.y);
  });

  return position;
}
