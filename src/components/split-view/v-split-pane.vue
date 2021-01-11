<template>
  <div class="v-split-pane" ref="pane">
    <slot />
  </div>
</template>

<script>
import usePane from "./use-pane";

export default {
  name: "v-split-pane",
  setup() {
    const { pane } = usePane();

    return {
      pane
    };
  }
};
</script>

<style>
@import "split-pane";
</style>
