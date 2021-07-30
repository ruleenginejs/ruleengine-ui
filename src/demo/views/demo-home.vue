<template>
  <v-content class="demo-content demo-home" w-full h-full scroll>
    <v-layout h-center vertical>
      <img class="demo-home__logo" :src="logo" alt="" />
      <h1>UI Toolkit for VS Code</h1>
      <p class="demo-text-center">
        Vue 3.0 based component library for developers of custom editors in
        Visual Studio Code.
      </p>
      <div class="demo-home__buttons">
        <router-link
          :to="{ name: 'component' }"
          class="v-button v-button--default"
          >Get Started</router-link
        >
        <v-button
          target="_blank"
          href="https://github.com/ruleenginejs/ruleengine-ui"
          secondary
          >GitHub</v-button
        >
      </div>
    </v-layout>
  </v-content>
</template>

<script>
import { ref } from "vue";
import vscodeLogo from "@/demo/assets/images/vscode-logo.svg";

export default {
  name: "demo-home",
  setup() {
    const logo = ref(vscodeLogo);

    return {
      logo
    };
  }
};
</script>
