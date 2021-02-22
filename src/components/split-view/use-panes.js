import { provide } from "vue";

export default function usePanes() {
  const panes = [];

  const registerPane = (paneOptions) => {
    panes.push(paneOptions);
  };

  const unregisterPane = (paneId) => {
    const index = panes.findIndex((pane) => pane.id === paneId);

    if (index !== -1) {
      panes.splice(index, 1);
    }
  };

  provide("registerPane", registerPane);
  provide("unregisterPane", unregisterPane);

  return {
    panes
  }
}
