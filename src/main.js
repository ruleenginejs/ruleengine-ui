import { createApp } from 'vue'
import App from './App.vue'
import UIKit from './index'
import router from './router'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import './demo/utils/hljs'
import globalDemoComponents from './demo/utils/global-demo-components'
import '@vscode/codicons/dist/codicon.css'

const app = createApp(App)

app.use(router)
app.use(UIKit)
app.use(hljsVuePlugin)
app.use(globalDemoComponents)

app.mount('#app')
