<template>
  <v-sidebar w-full h-full class="demo-sidebar">
    <v-content w-full h-full scroll>
      <v-sidebar-section expand title="Introduction">
        <demo-sidebar-nav :items="introduction" />
      </v-sidebar-section>
      <v-sidebar-section expand :bottom-border="false" title="Components">
        <demo-sidebar-nav :items="components" />
      </v-sidebar-section>
    </v-content>
  </v-sidebar>
</template>

<script>
import DemoSidebarNav from "./demo-sidebar-nav";

export default {
  name: "demo-sidebar",
  components: {
    DemoSidebarNav
  },
  data() {
    return {
      introduction: [
        {
          title: "Installation",
          routeName: "installation"
        }
      ],
      components: [
        {
          title: "Component 1",
          routeName: "Component1"
        },
        {
          title: "Component 2",
          routeName: "Component2"
        },
        {
          title: "Component 3",
          routeName: "Component3"
        },
        {
          title: "Component 4",
          routeName: "Component4"
        }
      ]
    };
  }
};
</script>
