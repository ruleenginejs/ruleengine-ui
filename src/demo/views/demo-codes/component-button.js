const button_basic_usage_html = `
<template>
  <v-layout gutter>
    <v-button>Default</v-button>
    <v-button secondary>Secondary</v-button>
  </v-layout>
</template>
`;

const button_disabled_html = `
<template>
  <v-layout gutter>
    <v-button disabled>Default</v-button>
    <v-button disabled secondary>Secondary</v-button>
  </v-layout>
</template>
`;

export default [
  {
    name: "button_basic_usage_html",
    code: button_basic_usage_html,
    lang: "html"
  },
  {
    name: "button_disabled_html",
    code: button_disabled_html,
    lang: "html"
  }
]
