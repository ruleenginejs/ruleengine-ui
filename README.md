# ruleengine-ui-kit-vue

## Installation

### npm

```bash
npm install @ruleenginejs/ruleengine-ui-kit-vue
```

Use [tailwindcss](https://github.com/tailwindlabs/tailwindcss) (recommended)

```bash
npm install tailwindcss
```

In your styles

```css
@import "tailwindcss/base";
```

## Usage

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import RuleEngineUIKit from "@ruleenginejs/ruleengine-ui-kit-vue"
import "@ruleenginejs/ruleengine-ui-kit-vue/dist/ruleengine-ui-kit-vue.css"
import "@ruleenginejs/ruleengine-ui-kit-vue/dist/dark.theme.css"

const app = createApp(App)

app.use(RuleEngineUIKit)

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

### Components

#### Layout

- v-layout
- v-content
- v-space

#### Inputs

- v-input
- v-autocomplete
- v-button
- v-checkbox
- v-select-box
- v-label
- v-fieldset
- v-field-layout

#### List

- v-list
- v-list-item

#### Dropdown

- v-dropdown
- v-suggest

#### Action Bar

- v-action-bar
- v-action-group
- v-action

#### Sidebar

- v-sidebar
- v-sidebar-section

#### Split View

- v-split-view
- v-split-pane

#### Tree View

- v-treeview
- v-tree-item

#### Tabs

- v-tabs
- v-tab

#### Graph

- v-graph-canvas
- v-graph-node
- v-graph-circle-node
- v-graph-port
- v-graph-connection

#### Icons

- v-icon-book
- v-icon-chevron-down
- v-icon-circle
- v-icon-close
- v-icon-doc-text
- v-icon-file-menu
- v-icon-folder
- v-icon-play
- v-icon-stop
- v-icon-plus-bold
- v-icon-script
- v-icon-checkmark
