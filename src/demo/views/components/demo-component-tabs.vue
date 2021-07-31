<template>
  <h2>Tabs</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-tabs v-model="selectedTab">
      <v-tab icon-color="#B69E24" modified>
        File 1.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab>
        File 2.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab icon-color="#B69E24">
        File 3.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab>
        File 4.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab>
        File 5.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab icon-color="#B69E24">
        File 6.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
    </v-tabs>
    <template #code>
      <demo-code name="tabs_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import { ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-tabs",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    return {
      selectedTab: ref(null)
    };
  }
};
</script>
