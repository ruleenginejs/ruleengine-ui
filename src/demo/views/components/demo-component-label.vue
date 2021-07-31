<template>
  <h2>Label</h2>

  <h3>Basic Usage</h3>
  <demo-block class="demo-label-block">
    <v-fieldset>
      <v-field-layout>
        <template #label>
          <v-label truncate for="input1">Label 1</v-label>
        </template>
        <template #value>
          <v-input id="input1" placeholder="Enter your text" />
        </template>
      </v-field-layout>
      <v-field-layout>
        <template #label>
          <v-label truncate for="checkbox1">Label 2</v-label>
        </template>
        <template #value>
          <v-checkbox id="checkbox1" v-model="value" />
        </template>
      </v-field-layout>
    </v-fieldset>
    <template #code>
      <demo-code name="label_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import { ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-label",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    return {
      value: ref(false)
    };
  }
};
</script>
