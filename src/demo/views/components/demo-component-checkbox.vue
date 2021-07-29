<template>
  <h2>Checkbox</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-layout gutter wrap>
      <v-layout gutter="sm" w-full h-center>
        <v-checkbox id="checkbox_1" v-model="checked" />
        <v-label for="checkbox_1">Checked</v-label>
      </v-layout>
      <v-layout gutter="sm" w-full h-center>
        <v-checkbox id="checkbox_2" v-model="unchecked" />
        <v-label for="checkbox_2">Unchecked</v-label>
      </v-layout>
    </v-layout>
    <template #code>
      <demo-code name="checkbox_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Disabled State</h3>
  <demo-block>
    <v-layout gutter wrap>
      <v-layout gutter="sm" w-full h-center>
        <v-checkbox id="checkbox_3" v-model="disabledChecked" disabled />
        <v-label for="checkbox_3">Checked</v-label>
      </v-layout>
      <v-layout gutter="sm" w-full h-center>
        <v-checkbox id="checkbox_4" v-model="disabledUnchecked" disabled />
        <v-label for="checkbox_4">Unchecked</v-label>
      </v-layout>
    </v-layout>
    <template #code>
      <demo-code name="checkbox_disabled_html" />
    </template>
  </demo-block>
</template>

<script>
import { ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-checkbox",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    const checked = ref(true);
    const unchecked = ref(false);
    const disabledChecked = ref(true);
    const disabledUnchecked = ref(false);

    return {
      checked,
      unchecked,
      disabledChecked,
      disabledUnchecked
    };
  }
};
</script>
