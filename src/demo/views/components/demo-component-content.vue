<template>
  <h2>Content</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h52">
      <v-content h-full scroll padding="md">
        <div class="demo-cube demo-cube-a demo-cube-h14" />
        <div class="demo-cube demo-cube-b demo-cube-h14" />
        <div class="demo-cube demo-cube-c demo-cube-h14" />
        <div class="demo-cube demo-cube-d demo-cube-h14" />
      </v-content>
    </div>
    <template #code>
      <demo-code name="content_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-content",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
