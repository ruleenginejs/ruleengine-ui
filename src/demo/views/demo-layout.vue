<template>
  <v-layout h-full w-full vertical>
    <v-layout not-shrink>
      <demo-header />
    </v-layout>
    <v-layout all-distr h-full>
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
