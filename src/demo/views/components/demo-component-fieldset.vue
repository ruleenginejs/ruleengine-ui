<template>
  <h2>Fieldset</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-fieldset label="Title">
      <v-field-layout>
        <template #label>
          <v-label truncate>Label 1</v-label>
        </template>
        <template #value>
          <v-input placeholder="Enter your text" />
        </template>
      </v-field-layout>
      <v-field-layout>
        <template #label>
          <v-label truncate>Label 2</v-label>
        </template>
        <template #value>
          <v-input placeholder="Enter your text" />
        </template>
      </v-field-layout>
    </v-fieldset>
    <template #code>
      <demo-code name="fieldset_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Vertical Layout</h3>
  <demo-block>
    <v-fieldset label="Title">
      <v-field-layout vertical>
        <template #label>
          <v-label truncate>Label 1</v-label>
        </template>
        <template #value>
          <v-input placeholder="Enter your text" />
        </template>
      </v-field-layout>
      <v-field-layout vertical>
        <template #label>
          <v-label truncate>Label 2</v-label>
        </template>
        <template #value>
          <v-input placeholder="Enter your text" />
        </template>
      </v-field-layout>
    </v-fieldset>
    <template #code>
      <demo-code name="fieldset_vertical_layout_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-fieldset",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
