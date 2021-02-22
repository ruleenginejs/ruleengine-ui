<template>
  <v-content padding="md">
    <button @click="horizontal = !horizontal">
      horizontal: {{ horizontal }}
    </button>
    <br />
    <button @click="destroySplitView = !destroySplitView">
      destroySplitView: {{ destroySplitView }}
    </button>
    <br />
    <button @click="toggleLeft">toggle left</button>
    <br />
    <button @click="toggleRight">toggle right</button>
  </v-content>
  <v-content padding="md" class="h-96">
    <v-split-view
      key="test"
      ref="splitview"
      v-if="!destroySplitView"
      :horizontal="horizontal"
      :snap-offset="30"
      :window-resize-delay="100"
      @resize="onResize"
    >
      <v-split-pane id="left" key="1" size="300px" :min-size="40"
        >Left</v-split-pane
      >
      <v-split-pane key="2" :min-size="200">Center</v-split-pane>
      <v-split-pane id="right" key="3" size="20%">Right</v-split-pane>
    </v-split-view>
  </v-content>
</template>

<script>
export default {
  name: "c-split-view",
  data() {
    return {
      horizontal: false,
      destroySplitView: false
    };
  },
  methods: {
    onResize(e) {
      console.log("onResize", e);
    },
    toggleLeft() {
      this.$refs.splitview.getInstance().togglePane("left", null, true);
    },
    toggleRight() {
      this.$refs.splitview.getInstance().togglePane("right", null, true);
    }
  }
};
</script>

<style>
.v-split-gutter {
  @apply bg-black;
}
</style>
