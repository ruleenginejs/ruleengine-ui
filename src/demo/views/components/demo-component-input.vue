<template>
  <h2>Input</h2>

  <h3>Basic Usage</h3>
  <demo-block class="demo-input-block">
    <v-input v-model="input" placeholder="Enter your text" />
    <template #code>
      <demo-code name="input_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Disabled Input</h3>
  <demo-block class="demo-input-block">
    <v-input v-model="disabledInput" disabled placeholder="Enter your text" />
    <template #code>
      <demo-code name="input_disabled_html" />
    </template>
  </demo-block>

  <h3>Input with icon</h3>
  <demo-block class="demo-input-block">
    <v-input v-model="inputWithIcon" placeholder="Enter your text">
      <template #icon>
        <v-icon-file-menu />
      </template>
    </v-input>
    <v-input v-model="inputWithIcon" placeholder="Enter your text">
      <template #icon>
        <i class="codicon codicon-file-add" />
      </template>
    </v-input>
    <template #code>
      <demo-code name="input_with_icon_html" />
    </template>
  </demo-block>
</template>

<script>
import { ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-button",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    const input = ref("");
    const disabledInput = ref("");
    const inputWithIcon = ref("");

    return {
      input,
      disabledInput,
      inputWithIcon
    };
  }
};
</script>
