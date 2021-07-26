<template>
  <h2>Layout</h2>
  <p>Quickly create layouts with no styling on flex.</p>

  <h3>Basic layout</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h60">
      <v-layout h-full w-full vertical>
        <v-layout not-shrink>
          <div class="demo-cube demo-cube-a demo-cube-h14" />
        </v-layout>
        <v-layout all-distr min-h-0>
          <v-layout h-full not-shrink>
            <div class="demo-cube demo-cube-b demo-cube-w52" />
          </v-layout>
          <v-layout h-full all-distr>
            <div class="demo-cube demo-cube-c" />
          </v-layout>
        </v-layout>
      </v-layout>
    </div>
    <template #code>
      <demo-code name="layout_basic_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-layout",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
