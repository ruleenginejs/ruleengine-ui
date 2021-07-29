<template>
  <h2>Sidebar</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h60">
      <v-layout h-full w-full>
        <v-layout not-shrink class="demo-cube-w52">
          <v-sidebar w-full h-full />
        </v-layout>
        <v-layout all-distr h-full>
          <div class="demo-cube demo-cube-a" />
        </v-layout>
      </v-layout>
    </div>
    <template #code>
      <demo-code name="sidebar_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Sidebar Section</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h60">
      <v-layout h-full w-full>
        <v-layout not-shrink class="demo-cube-w52">
          <v-sidebar w-full h-full lt-border rt-border>
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
    </div>
    <template #code>
      <demo-code name="sidebar_section_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-sidebar",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
