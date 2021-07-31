<template>
  <h2>SelectBox</h2>

  <h3>Basic Usage</h3>
  <demo-block class="demo-select-block">
    <v-select-box v-model="value" :items="options" />
    <template #code>
      <demo-code name="selectbox_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Disabled Select</h3>
  <demo-block class="demo-select-block">
    <v-select-box v-model="disabledValue" :items="options" disabled />
    <template #code>
      <demo-code name="selectbox_disabled_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import { reactive, ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-selectbox",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    const value = ref("Option 1");

    const options = reactive([
      {
        text: "Option 1",
        value: "Option 1"
      },
      {
        text: "Option 2",
        value: "Option 2"
      },
      {
        text: "Option 3",
        value: "Option 3"
      },
      {
        text: "Option 4",
        value: "Option 4"
      },
      {
        text: "Option 5",
        value: "Option 5"
      }
    ]);

    const disabledValue = ref("Option 1");

    return {
      options,
      value,
      disabledValue
    };
  }
};
</script>
