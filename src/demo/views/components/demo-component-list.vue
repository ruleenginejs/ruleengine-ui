<template>
  <h2>List</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h52">
      <v-content h-full scroll>
        <v-list :items="items" v-model:selected="selectedItem" />
      </v-content>
    </div>
    <template #code>
      <demo-code name="list_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Focusable</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h52">
      <v-content h-full scroll>
        <v-list :tab-index="0" :items="items" v-model:selected="focusableSelectedItem" />
      </v-content>
    </div>
    <template #code>
      <demo-code name="list_focusable_html" />
    </template>
  </demo-block>
</template>

<script>
import { reactive, ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-list",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    const items = reactive([]);
    const selectedItem = ref({ id: 1 });
    const focusableSelectedItem = ref({ id: 1 });

    for (let i = 0; i < 20; i++) {
      items.push({
        id: i + 1,
        text: `Item ${i + 1}`,
        icon: "v-icon-doc-text"
      });
    }

    return {
      items,
      selectedItem,
      focusableSelectedItem
    };
  }
};
</script>
