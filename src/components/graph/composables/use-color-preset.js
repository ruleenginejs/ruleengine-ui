import { computed } from 'vue';

const COLOR_PRESET = [
  'blue',
  'green',
  'brown',
  'indigo',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'yellow'
];

const COLOR_PRESET_MAP = COLOR_PRESET.reduce((res, val) => {
  res[val] = true;
  return res;
}, {});

export default function useColorPreset(color) {
  const colorStyle = computed(() =>
    !COLOR_PRESET_MAP[color.value] ? color.value : null
  );

  const colorCssClass = computed(() =>
    COLOR_PRESET_MAP[color.value] ? getColorCss(color.value) : null
  );

  function getColorCss(colorName) {
    return `v-graph-node__header--${colorName}`;
  }

  return {
    colorStyle,
    colorCssClass
  };
}
