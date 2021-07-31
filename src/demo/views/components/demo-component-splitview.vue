<template>
  <h2>SplitView</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h60">
      <v-split-view :snap-offset="30">
        <v-split-pane size="200px" :min-size="40">
          <div class="demo-cube demo-cube-a" />
        </v-split-pane>
        <v-split-pane :min-size="150">
          <div class="demo-cube demo-cube-b" />
        </v-split-pane>
        <v-split-pane size="20%">
          <div class="demo-cube demo-cube-c" />
        </v-split-pane>
      </v-split-view>
    </div>
    <template #code>
      <demo-code name="splitview_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Horizontal SplitView</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h60">
      <v-split-view horizontal :snap-offset="30">
        <v-split-pane>
          <div class="demo-cube demo-cube-a" />
        </v-split-pane>
        <v-split-pane>
          <div class="demo-cube demo-cube-b" />
        </v-split-pane>
        <v-split-pane>
          <div class="demo-cube demo-cube-c" />
        </v-split-pane>
      </v-split-view>
    </div>
    <template #code>
      <demo-code name="splitview_horizontal_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-splitview",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
