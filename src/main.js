import { createApp } from 'vue'
import App from './App.vue'
import UIKit from './index'
import router from './router'
import './demo/utils/hljs';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import '@vscode/codicons/dist/codicon.css';

const app = createApp(App)

app.use(router)
app.use(UIKit)
app.use(hljsVuePlugin)

app.mount('#app')
