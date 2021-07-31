const label_basic_usage_html = `
<template>
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
</template>
`;

export default [
  {
    name: "label_basic_usage_html",
    code: label_basic_usage_html,
    lang: "html"
  }
]
