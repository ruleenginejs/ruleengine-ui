import { createApp } from 'vue'
import App from './App.vue'
import UIKit from "./index"
import "@vscode/codicons/dist/codicon.css";

const app = createApp(App)

app.use(UIKit)
app.mount('#app')
