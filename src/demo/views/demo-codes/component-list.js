const list_basic_usage_html = `
<template>
  <v-content h-full scroll>
    <v-list :items="items" v-model:selected="selectedItem" />
  </v-content>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const items = reactive([]);
      const selectedItem = ref({ id: 1 });

      for (let i = 0; i < 15; i++) {
        items.push({
          id: i + 1,
          text: \`Item \${i + 1}\`,
          icon: "v-icon-doc-text"
        });
      }

      return {
        items,
        selectedItem
      };
    }
  }
</script>
`;

const list_focusable_html = `
<template>
  <v-content h-full scroll>
    <v-list :tab-index="0" :items="items" v-model:selected="selectedItem" />
  </v-content>
</template>

<script>
  import { ref, reactive } from 'vue'

  export default {
    setup() {
      const items = reactive([]);
      const selectedItem = ref({ id: 1 });

      for (let i = 0; i < 15; i++) {
        items.push({
          id: i + 1,
          text: \`Item \${i + 1}\`,
          icon: "v-icon-doc-text"
        });
      }

      return {
        items,
        selectedItem
      };
    }
  }
</script>
`;

export default [
  {
    name: "list_basic_usage_html",
    code: list_basic_usage_html,
    lang: "html"
  },
  {
    name: "list_focusable_html",
    code: list_focusable_html,
    lang: "html"
  }
]
