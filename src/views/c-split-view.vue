<template>
  <v-content padding="md">
    <button @click="vertical = !vertical">vertical: {{ vertical }}</button>
    <button @click="destroySplitView = !destroySplitView">
      destroySplitView: {{ destroySplitView }}
    </button>
    <button @click="onCollapseLeft">collapse left</button>
    <button @click="onCollapseRight">collapse right</button>
  </v-content>
  <v-content padding="md" class="h-96">
    <v-split-view
      ref="splitview"
      :sizes="[20, 60, 20]"
      :min-sizes="[0, 4, 100]"
      :gutter-size="4"
      v-if="!destroySplitView"
      :vertical="vertical"
      @drag="onDrag"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
    >
      <v-split-pane>Left</v-split-pane>
      <v-split-pane>Center</v-split-pane>
      <v-split-pane>Right</v-split-pane>
    </v-split-view>
  </v-content>
</template>

<script>
export default {
  name: "c-split-view",
  data() {
    return {
      vertical: true,
      destroySplitView: false
    };
  },
  methods: {
    onCollapseRight() {
      this.$refs.splitview.collapse(2);
    },
    onCollapseLeft() {
      this.$refs.splitview.collapse(0);
    },
    onDrag(e) {
      console.log("onDrag", e);
    },
    onDragStart(e) {
      console.log("onDragStart", e);
    },
    onDragEnd(e) {
      console.log("onDragEnd", e);
    }
  }
};
</script>

<style>
.v-gutter {
  @apply bg-black;
}
</style>
