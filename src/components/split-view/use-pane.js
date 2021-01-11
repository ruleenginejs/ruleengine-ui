import { inject, ref, onMounted, onBeforeUnmount } from "vue";

export default function usePane() {
  const pane = ref(null);
  const registerPane = inject("registerPane");
  const unregisterPane = inject("unregisterPane");

  onMounted(() => {
    if (pane.value && registerPane) {
      registerPane(pane.value);
    }
  });

  onBeforeUnmount(() => {
    if (pane.value && unregisterPane) {
      unregisterPane(pane.value);
    }
  })

  return {
    pane
  }
}
