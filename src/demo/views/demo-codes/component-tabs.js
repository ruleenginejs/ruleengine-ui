const tabs_basic_usage_html = `
<template>
  <v-tabs v-model="selectedTab">
    <v-tab icon-color="#B69E24" modified>
      File 1.txt
      <template #icon>
        <v-icon-book />
      </template>
    </v-tab>
    <v-tab>
      File 2.txt
      <template #icon>
        <v-icon-book />
      </template>
    </v-tab>
    <v-tab icon-color="#B69E24">
      File 3.txt
      <template #icon>
        <v-icon-book />
      </template>
    </v-tab>
    <v-tab>
      File 4.txt
      <template #icon>
        <v-icon-book />
      </template>
    </v-tab>
    <v-tab>
      File 5.txt
      <template #icon>
        <v-icon-book />
      </template>
    </v-tab>
    <v-tab icon-color="#B69E24">
      File 6.txt
      <template #icon>
        <v-icon-book />
      </template>
    </v-tab>
  </v-tabs>
</template>
`;

export default [
  {
    name: "tabs_basic_usage_html",
    code: tabs_basic_usage_html,
    lang: "html"
  }
]
