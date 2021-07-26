<template>
  <v-layout h-full w-full vertical>
    <v-layout not-shrink>
      <demo-header />
    </v-layout>
    <v-layout all-distr min-h-0>
      <v-content class="demo-content" w-full h-full scroll>
        <p>
          The page you are visiting was not found. Go to
          <router-link class="demo-link" :to="{ name: 'home' }">main page.</router-link>
        </p>
      </v-content>
    </v-layout>
  </v-layout>
</template>

<script>
import DemoHeader from "./demo-header";

export default {
  name: "demo-not-found",
  components: {
    DemoHeader
  }
};
</script>
