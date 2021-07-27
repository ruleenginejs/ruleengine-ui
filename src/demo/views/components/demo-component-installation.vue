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

  <p>Use tailwindcss (for reset style)</p>
  <demo-code lang="shell" code="npm install tailwindcss" />

  <p>In your styles</p>
  <demo-code lang="css" code='@import "tailwindcss/base";' />

  <p>Add codicons (optional)</p>
  <demo-code lang="shell" code="npm install @vscode/codicons" />

  <p>In your code</p>
  <demo-code lang="javascript" code='import "@vscode/codicons/dist/codicon.css"' />

  <h3>Usage</h3>
  <demo-code name="installation_usage_js" />

  <p>In your templates</p>
  <demo-code name="installation_usage_html" />
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
