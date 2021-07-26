<template>
  <v-layout h-full w-full vertical>
    <v-layout not-shrink>
      <demo-header />
    </v-layout>
    <v-layout all-distr min-h-0>
      <router-view />
    </v-layout>
  </v-layout>
</template>

<script>
import DemoHeader from "./demo-header";

export default {
  name: "demo-layout",
  components: {
    DemoHeader
  }
};
</script>
