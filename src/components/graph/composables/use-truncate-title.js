import { computed } from "vue";

export default function useTruncateTitle(title, maxLength) {
  const truncateTitle = computed(() => {
    if (!title.value) return "";
    else if (title.value.length <= maxLength.value) return title.value;
    else return title.value.substring(0, maxLength.value);
  });

  const truncateLength = computed(() => truncateTitle.value.length);

  return {
    truncateTitle,
    truncateLength
  };
}
