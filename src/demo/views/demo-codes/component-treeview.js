const treeview_basic_usage_html = `
<template>
  <v-treeview :items="items" />
</template>

<script>
  import { reactive } from 'vue'

  export default {
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
  }
</script>
`;

export default [
  {
    name: "treeview_basic_usage_html",
    code: treeview_basic_usage_html,
    lang: "html"
  }
]
