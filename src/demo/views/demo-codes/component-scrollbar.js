const scrollbar_basic_usage_html = `
<template>
  <div class="scrollbar" style="height: 260px; overflow: auto">
    <v-layout gutter wrap>
      <div v-for="item in 10" :key="item" class="demo-cube demo-cube-num demo-cube-h14">
        {{ item }}
      </div>
    </v-layout>
  </div>
</template>
`;

const scrollbar_horizontal_scroll_html = `
<template>
  <div class="scrollbar" style="height: 70px; overflow: auto">
    <v-layout gutter>
      <div v-for="item in 20" :key="item" class="demo-cube demo-cube-num demo-cube-h14 demo-cube-w24 demo-cube-no-shrink">
        {{ item }}
      </div>
    </v-layout>
  </div>
</template>
`;

export default [
  {
    name: "scrollbar_basic_usage_html",
    code: scrollbar_basic_usage_html,
    lang: "html"
  },
  {
    name: "scrollbar_horizontal_scroll_html",
    code: scrollbar_horizontal_scroll_html,
    lang: "html"
  }
]
