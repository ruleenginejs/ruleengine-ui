import {
  inject,
  ref,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  markRaw
} from 'vue';

export default function usePane(options) {
  const pane = ref(null);
  const { id, size, minSize, disabled, fallbackExpandSize } = options;
  const paneId = id.value ?? getCurrentInstance().uid;

  const registerPane = inject('registerPane');
  const unregisterPane = inject('unregisterPane');

  onMounted(() => {
    if (pane.value) {
      registerPane?.(
        markRaw({
          id: paneId,
          element: pane.value,
          size: size.value,
          minSize: minSize.value,
          disabled: disabled.value,
          fallbackExpandSize: fallbackExpandSize.value
        })
      );
    }
  });

  onBeforeUnmount(() => {
    unregisterPane?.(paneId);
  });

  return {
    pane
  };
}
