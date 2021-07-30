const installation_usage_js = `
import { createApp } from 'vue'
import App from './App.vue'
import RuleEngineUIKit from '@ruleenginejs/ruleengine-ui'
import '@ruleenginejs/ruleengine-ui/dist/ruleengine-ui.css'
import '@ruleenginejs/ruleengine-ui/dist/dark.theme.css'

const app = createApp(App)

app.use(RuleEngineUIKit)

app.mount('#app')
`;

const installation_usage_html = `
<v-action-bar>
  <v-action @click="onClick">
    <v-icon-play />
  </v-action>
</v-action-bar>
`;

export default [
  {
    name: "installation_usage_js",
    code: installation_usage_js,
    lang: "javascript"
  },
  {
    name: "installation_usage_html",
    code: installation_usage_html,
    lang: "html"
  }
]
