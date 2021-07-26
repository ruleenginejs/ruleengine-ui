<template>
  <h2>Space</h2>
  <p>Space between two elements.</p>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-layout>
      <div class="demo-cube demo-cube-a demo-cube-w14" />
      <v-space />
      <div class="demo-cube demo-cube-b demo-cube-w14" />
    </v-layout>
    <template #code>
      <demo-code name="space_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-space",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
