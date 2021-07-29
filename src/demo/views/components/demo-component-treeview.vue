<template>
  <h2>Treeview</h2>
  <p>Display a set of data with hierarchies.</p>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-treeview :items="items" />
    <template #code>
      <demo-code name="treeview_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import { reactive } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-treeview",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    const items = reactive([
      {
        id: 1,
        name: "Root folder",
        expanded: true,
        selected: false,
        children: [
          {
            id: 2,
            name: "Folder 1",
            expanded: false,
            selected: false,
            icon: "v-icon-folder",
            children: [
              {
                id: 3,
                name: "File 1",
                icon: "v-icon-doc-text",
                expanded: false,
                selected: false
              },
              {
                id: 4,
                name: "File 2",
                icon: "v-icon-doc-text",
                expanded: false,
                selected: false
              }
            ]
          },
          {
            id: 5,
            name: "File 3",
            icon: "v-icon-doc-text",
            expanded: false,
            selected: false
          },
          {
            id: 6,
            name: "Folder 2",
            icon: "v-icon-folder",
            expanded: false,
            selected: false,
            children: []
          }
        ]
      }
    ]);

    return {
      items
    };
  }
};
</script>
