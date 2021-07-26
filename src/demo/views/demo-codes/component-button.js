const basic_usage_html = `
<template>
  <v-layout gutter>
    <v-button>Default</v-button>
    <v-button secondary>Secondary</v-button>
  </v-layout>
</template>
`;

const disabled_button_html = `
<template>
  <v-layout gutter>
    <v-button disabled>Default</v-button>
    <v-button disabled secondary>Secondary</v-button>
  </v-layout>
</template>
`;

export default [
  {
    name: "basic_usage_html",
    code: basic_usage_html,
    lang: "html"
  },
  {
    name: "disabled_button_html",
    code: disabled_button_html,
    lang: "html"
  }
]
