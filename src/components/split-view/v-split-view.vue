<template>
  <div class="v-split-view">
    <slot />
  </div>
</template>

<script>
import { provide } from "vue";

export default {
  name: "v-split-view",
  emits: ["resized"],
  setup(props, { slots, emit }) {
    const panes = {};
    const activePanes = {};

    const registerPane = (index, instance) => {
      if (instance) {
        panes[index] = instance;
      } else {
        delete panes[index];
      }
    };

    const findPanes = (splitterIdx) => {
      const vnodes = slots.default() ?? [];
      for (let i = 0; i < vnodes.length; i++) {
        const vnode = vnodes[i];
        if (vnode.props?.index === splitterIdx) {
          const prev = vnodes[i - 1];
          const next = vnodes[i + 1];
          const leftPane = panes[prev.props?.index];
          const rightPane = panes[next.props?.index];
          return leftPane && rightPane
            ? {
                leftPane,
                rightPane
              }
            : null;
        }
      }
      return null;
    };

    const moveStart = (splitterIdx) => {
      const panes = findPanes(splitterIdx);

      if (panes) {
        activePanes[splitterIdx] = panes;
      }
    };

    const move = (splitterIdx, { x }) => {
      const panes = activePanes[splitterIdx];

      if (panes) {
        const { leftPane, rightPane } = panes;
        if (leftPane.canResize(x) && rightPane.canResize(-x)) {
          leftPane.resize(x);
          rightPane.resize(-x);
        }
      }
    };

    const modeEnd = (splitterIdx) => {
      const panes = activePanes[splitterIdx];

      if (panes) {
        const { leftPane, rightPane } = panes;

        emit("resized", {
          splitterIndex: splitterIdx,
          leftPaneIndex: leftPane.index(),
          rightPaneIndex: rightPane.index()
        });
      }

      delete activePanes[splitterIdx];
    };

    provide("registerPane", registerPane);
    provide("movestart", moveStart);
    provide("move", move);
    provide("moveend", modeEnd);
  }
};
</script>

<style>
@import "split-view";
</style>
