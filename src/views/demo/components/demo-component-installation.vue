<template>
  <h2>Installation</h2>
  <h3>npm</h3>
  <p>
    Installing with npm is recommended and it works seamlessly with
    <a class="demo-external-link" href="https://webpack.js.org/">webpack</a>.
  </p>
  <demo-code
    lang="shell"
    code="npm install @ruleenginejs/ruleengine-ui-kit-vue"
  />

  <p>Use tailwindcss (recommended)</p>
  <demo-code lang="shell" code="npm install tailwindcss" />

  <p>In your styles</p>
  <demo-code lang="css" code='@import "tailwindcss/base";' />

  <h3>Usage</h3>
  <demo-code name="usage_js" />

  <p>In your templates</p>
  <demo-code name="usage_html" />
</template>

<script>
import DemoCode from "../demo-code";

export default {
  name: "demo-component-installation",
  components: {
    DemoCode
  }
};
</script>
