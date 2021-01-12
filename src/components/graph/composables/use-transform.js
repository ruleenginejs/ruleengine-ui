import { computed } from "vue"

export default function useTransform(position) {
  const transformStyle = computed(() => {
    return `translate(${position.x}px, ${position.y}px)`
  });

  return transformStyle;
}
