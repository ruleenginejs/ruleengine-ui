const usage_js = `
import { createApp } from 'vue'
import App from './App.vue'
import RuleEngineUIKit from '@ruleenginejs/ruleengine-ui-kit-vue'
import '@ruleenginejs/ruleengine-ui-kit-vue/dist/ruleengine-ui-kit-vue.css'
import '@ruleenginejs/ruleengine-ui-kit-vue/dist/dark.theme.css'

const app = createApp(App)

app.use(RuleEngineUIKit)

app.mount('#app')
`;

const usage_html = `
<v-action-bar>
  <v-action @click="onClick">
    <v-icon-play />
  </v-action>
</v-action-bar>
`;

export default [
  {
    name: "usage_js",
    code: usage_js,
    lang: "javascript"
  },
  {
    name: "usage_html",
    code: usage_html,
    lang: "html"
  }
]
