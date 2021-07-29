const sidebar_basic_usage_html = `
<template>
  <v-layout h-full w-full>
    <v-layout not-shrink class="demo-cube-w52">
      <v-sidebar w-full h-full />
    </v-layout>
    <v-layout all-distr h-full>
      <div class="demo-cube demo-cube-a" />
    </v-layout>
  </v-layout>
</template>
`;

const sidebar_section_html = `
<template>
  <v-layout h-full w-full>
    <v-layout not-shrink class="demo-cube-w52">
      <v-sidebar w-full h-full>
        <v-content w-full h-full scroll>
          <v-sidebar-section title="Section A">
            <div class="demo-cube demo-cube-a demo-cube-h14" />
          </v-sidebar-section>
          <v-sidebar-section title="Section B">
            <div class="demo-cube demo-cube-b demo-cube-h14" />
          </v-sidebar-section>
          <v-sidebar-section title="Section C" :bottom-border="false">
            <div class="demo-cube demo-cube-c demo-cube-h14" />
          </v-sidebar-section>
        </v-content>
      </v-sidebar>
    </v-layout>
    <v-layout all-distr h-full>
      <div class="demo-cube demo-cube-d" />
    </v-layout>
  </v-layout>
</template>
`;

export default [
  {
    name: "sidebar_basic_usage_html",
    code: sidebar_basic_usage_html,
    lang: "html"
  },
  {
    name: "sidebar_section_html",
    code: sidebar_section_html,
    lang: "html"
  }
]
