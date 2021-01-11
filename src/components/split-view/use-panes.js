import { provide } from "vue";

export default function usePanes() {
  const panes = [];

  const registerPane = (paneElement, options = {}) => {
    panes.push({ paneElement, ...options });
  };

  const unregisterPane = (paneElement) => {
    const item = panes.find((item) => item.paneElement === paneElement);
    if (item) {
      const index = panes.indexOf(item);
      if (index > -1) {
        panes.splice(index, 1);
      }
    }
  };

  provide("registerPane", registerPane);
  provide("unregisterPane", unregisterPane);

  return {
    panes
  }
}
