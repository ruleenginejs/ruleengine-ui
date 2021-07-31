<template>
  <v-split-view :snap-offset="30" @created="created = true">
    <v-split-pane size="290px">
      <demo-sidebar />
    </v-split-pane>
    <v-split-pane :min-size="200">
      <v-content v-if="created" class="demo-content" w-full h-full scroll>
        <router-view />
      </v-content>
    </v-split-pane>
  </v-split-view>
</template>

<script>
import { ref } from "vue";
import DemoSidebar from "./demo-sidebar";

export default {
  name: "demo-component-layout",
  components: {
    DemoSidebar
  },
  setup() {
    return {
      created: ref(false)
    };
  }
};
</script>
