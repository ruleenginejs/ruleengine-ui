<template>
  <v-split-view :snap-offset="30">
    <v-split-pane size="290px">
      <demo-sidebar />
    </v-split-pane>
    <v-split-pane :min-size="200">
      <v-content w-full h-full scroll padding="md" class="demo-component-content">
        <router-view />
      </v-content>
    </v-split-pane>
  </v-split-view>
</template>

<script>
import DemoSidebar from "./demo-sidebar";

export default {
  name: "demo-component-layout",
  components: {
    DemoSidebar
  }
};
</script>
