import { createApp } from 'vue'
import App from './App.vue'
import UIKit from './index'
import router from './router'
import '@vscode/codicons/dist/codicon.css';

const app = createApp(App)

app.use(router)
app.use(UIKit)

app.mount('#app')
