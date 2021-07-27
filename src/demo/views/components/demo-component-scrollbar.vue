<template>
  <h2>Scrollbar</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <div class="scrollbar" style="height: 260px; overflow: auto">
      <v-layout gutter wrap>
        <div v-for="item in 10" :key="item" class="demo-cube demo-cube-num demo-cube-h14">
          {{ item }}
        </div>
      </v-layout>
    </div>
    <template #code>
      <demo-code name="scrollbar_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Horizontal Scroll</h3>
  <demo-block>
    <div class="scrollbar" style="height: 70px; overflow: auto">
      <v-layout gutter>
        <div
          v-for="item in 20"
          :key="item"
          class="demo-cube demo-cube-num demo-cube-h14 demo-cube-w24 demo-cube-no-shrink"
        >
          {{ item }}
        </div>
      </v-layout>
    </div>
    <template #code>
      <demo-code name="scrollbar_horizontal_scroll_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-scrollbar",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
