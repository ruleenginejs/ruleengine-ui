import { computed } from "vue";

const COLOR_PRESET = [
  "blue",
  "green"
];

export default function useColorPreset(color) {
  const colorStyle = computed(() =>
    COLOR_PRESET.indexOf(color.value) === -1 ? color.value : null);

  const colorCssClass = computed(() =>
    COLOR_PRESET.indexOf(color.value) !== -1 ? getColorCss(color.value) : null);

  function getColorCss(colorName) {
    return `v-graph-node__header--${colorName}`;
  }

  return {
    colorStyle,
    colorCssClass
  }
}
