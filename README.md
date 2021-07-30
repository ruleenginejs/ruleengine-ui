# ruleengine-ui [![npm version](https://badge.fury.io/js/%40ruleenginejs%2Fruleengine-ui.svg)](https://badge.fury.io/js/%40ruleenginejs%2Fruleengine-ui)

> Vue 3.0 based component library for developers of custom editors in Visual Studio Code.

[Live Demo](https://ruleenginejs.github.io/ruleengine-ui/)

## Installation

### npm

```bash
npm install @ruleenginejs/ruleengine-ui
```

Use [tailwindcss](https://github.com/tailwindlabs/tailwindcss) (for reset style)

```bash
npm install tailwindcss
```

In your styles

```css
@import "tailwindcss/base";
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
import "@ruleenginejs/ruleengine-ui/dist/ruleengine-ui.css"
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

Read the [documentation and demos](https://ruleenginejs.github.io/ruleengine-ui/).

### Components


#### Basic
- Layout
- Content
- Button
- Space
- Icon
- Scrollbar

#### Form
- Input
- Checkbox
- Select
- Autocomplete
- Fieldset
- Label

#### Data
- List
- Treeview

#### Navigation
- Sidebar
- Tabs
- ActionBar
- Dropdown

#### Graph
- Node Graph

#### Others
- SplitView
- Suggest

## License

Licensed under the [MIT License](./LICENSE).
