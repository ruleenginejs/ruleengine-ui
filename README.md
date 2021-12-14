# ruleengine-ui [![npm version](https://badge.fury.io/js/%40ruleenginejs%2Fruleengine-ui.svg)](https://badge.fury.io/js/%40ruleenginejs%2Fruleengine-ui)

> Vue 3.0 based component library for developers of custom editors in Visual Studio Code.

[Live Demo](https://ruleenginejs.github.io/ruleengine-ui-demo/)

## Installation

### npm

```bash
npm install @ruleenginejs/ruleengine-ui
```

Add [codicons](https://github.com/microsoft/vscode-codicons) (optional)

```bash
npm install @vscode/codicons
```

In your code
```javascript
import "@vscode/codicons/dist/codicon.css"
```

## Usage

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import RuleEngineUI from "@ruleenginejs/ruleengine-ui"
// Add css styles
import "@ruleenginejs/ruleengine-ui/dist/normalize.css"
import "@ruleenginejs/ruleengine-ui/dist/style.css"
import "@ruleenginejs/ruleengine-ui/dist/dark.theme.css"

const app = createApp(App)

app.use(RuleEngineUI)

app.mount('#app')
```

In your templates

```html
<v-action-bar>
  <v-action @click="onClick">
    <v-icon-play />
  </v-action>
</v-action-bar>
```

## Documentation

Read the [documentation and demos](https://ruleenginejs.github.io/ruleengine-ui-demo/).

### Components

#### Basic
- [Layout](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/layout)
- [Content](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/content)
- [Button](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/button)
- [Space](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/space)
- [Icon](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/icon)
- [Scrollbar](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/scrollbar)

#### Form
- [Input](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/input)
- [Checkbox](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/checkbox)
- [Select](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/selectbox)
- [Autocomplete](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/autocomplete)
- [Fieldset](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/fieldset)
- [Label](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/label)

#### Data
- [List](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/list)
- [Treeview](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/treeview)

#### Navigation
- [Sidebar](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/sidebar)
- [Tabs](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/tabs)
- [ActionBar](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/action-bar)
- [ActionList](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/action-list)
- [Dropdown](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/dropdown)
- [FloatingToolbar](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/floating-toolbar)

#### Graph
- [Node Graph](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/node-graph)

#### Others
- [SplitView](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/splitview)
- [Draggable](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/draggable)
- [Suggest](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/suggest)
- [KeybindingLabel](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/keybinding-label)
- [KeyboardShortcuts](https://ruleenginejs.github.io/ruleengine-ui-demo/#/component/keyboard-shortcuts)

## License

Licensed under the [MIT License](./LICENSE).
