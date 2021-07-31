const splitview_basic_usage_html = `
<template>
  <v-split-view :snap-offset="30">
    <v-split-pane size="200px" :min-size="40">
      <div class="demo-cube demo-cube-a" />
    </v-split-pane>
    <v-split-pane :min-size="150">
      <div class="demo-cube demo-cube-b" />
    </v-split-pane>
    <v-split-pane size="20%">
      <div class="demo-cube demo-cube-c" />
    </v-split-pane>
  </v-split-view>
</template>
`;

const splitview_horizontal_usage_html = `
<template>
  <v-split-view horizontal :snap-offset="30">
    <v-split-pane>
      <div class="demo-cube demo-cube-a" />
    </v-split-pane>
    <v-split-pane>
      <div class="demo-cube demo-cube-b" />
    </v-split-pane>
    <v-split-pane>
      <div class="demo-cube demo-cube-c" />
    </v-split-pane>
  </v-split-view>
</template>
`;

export default [
  {
    name: "splitview_basic_usage_html",
    code: splitview_basic_usage_html,
    lang: "html"
  },
  {
    name: "splitview_horizontal_usage_html",
    code: splitview_horizontal_usage_html,
    lang: "html"
  }
]
