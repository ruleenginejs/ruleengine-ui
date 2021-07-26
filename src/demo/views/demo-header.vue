<template>
  <v-layout w-full h-center class="demo-header">
    <div class="demo-header__logo">
      <router-link :to="{ name: 'home' }">Rule Engine UI</router-link>
    </div>
    <v-space />
    <div class="demo-header__nav">
      <router-link :to="{ name: 'component' }">Guide</router-link>
      <router-link :to="{ name: 'component' }">Components</router-link>
      <a
        href="https://github.com/ruleenginejs/ruleengine-ui-kit-vue"
        class="demo-external-link"
        target="_blank"
        >GitHub</a
      >
    </div>
  </v-layout>
</template>

<script>
export default {
  name: "demo-header"
};
</script>
