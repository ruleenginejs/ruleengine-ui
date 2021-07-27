const icon_basic_usage_html = `
<template>
  <v-layout gutter wrap>
    <v-icon-book />
    <v-icon-checkmark />
    <v-icon-chevron-down />
    <v-icon-circle />
    <v-icon-close />
    <v-icon-doc-text />
    <v-icon-file-menu />
    <v-icon-folder />
    <v-icon-play />
    <v-icon-stop />
    <v-icon-plus-bold />
    <v-icon-plus />
    <v-icon-script />
    <v-icon-sidebar-left />
    <v-icon-sidebar-right />
  </v-layout>
</template>
`;

const codicons_html = `
<template>
  <v-layout gutter wrap>
    <i class="codicon codicon-account"/>
    <i class="codicon codicon-activate-breakpoints"/>
    <i class="codicon codicon-add"/>
    <i class="codicon codicon-alert"/>
    <i class="codicon codicon-archive"/>
    <i class="codicon codicon-array"/>
  </v-layout>
</template>
`;

export default [
  {
    name: "icon_basic_usage_html",
    code: icon_basic_usage_html,
    lang: "html"
  },
  {
    name: "codicons_html",
    code: codicons_html,
    lang: "html"
  }
]
