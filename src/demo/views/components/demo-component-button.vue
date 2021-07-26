<template>
  <h2>Button</h2>
  <p>Simple button.</p>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-layout gutter>
      <v-button>Default</v-button>
      <v-button secondary>Secondary</v-button>
    </v-layout>
    <template #code>
      <demo-code name="basic_usage_html" />
    </template>
  </demo-block>

  <h3>Disabled Button</h3>
  <demo-block>
    <v-layout gutter>
      <v-button disabled>Default</v-button>
      <v-button disabled secondary>Secondary</v-button>
    </v-layout>
    <template #code>
      <demo-code name="basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-button",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
