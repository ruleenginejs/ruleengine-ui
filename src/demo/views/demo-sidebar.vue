<template>
  <v-sidebar w-full h-full class="demo-sidebar">
    <v-content w-full h-full scroll="md">
      <v-sidebar-section header-compact expand title="Getting Started">
        <demo-sidebar-nav :items="gettingStarted" />
      </v-sidebar-section>
      <v-sidebar-section header-compact expand :bottom-border="false" title="Components">
        <demo-sidebar-nav :items="components" />
      </v-sidebar-section>
    </v-content>
  </v-sidebar>
</template>

<script>
import DemoSidebarNav from "./demo-sidebar-nav";
import menu from "./demo-menu";

export default {
  name: "demo-sidebar",
  components: {
    DemoSidebarNav
  },
  data() {
    return menu;
  }
};
</script>
