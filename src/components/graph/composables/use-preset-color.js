import { computed } from "vue";

export default function usePresetColor(color, variants = null, cssClassFn = null) {
  const colorStyle = computed(() =>
    variants && variants.indexOf(color.value) > -1 ? null : color.value);

  const colorClassName = computed(() =>
    variants && variants.indexOf(color.value) > -1 && cssClassFn ? cssClassFn(color.value) : null)

  return {
    colorStyle,
    colorClassName
  }
}
