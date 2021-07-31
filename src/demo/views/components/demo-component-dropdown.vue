<template>
  <h2>Dropdown</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-button id="button-1" @click="dropdownOpen = !dropdownOpen">
      Toggle Dropdown
    </v-button>
    <v-dropdown
      v-model:visible="dropdownOpen"
      anchor="button-1"
      anchor-constraint
      :offset-y="4"
    >
      <v-content fill>
        <v-list :items="items" @update:selected="dropdownOpen = false" />
      </v-content>
    </v-dropdown>
    <template #code>
      <demo-code name="dropdown_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import { ref } from "vue";
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-dropdown",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    return {
      dropdownOpen: ref(false),
      items: ref([
        {
          id: 1,
          text: "Item 1",
          icon: "v-icon-doc-text",
          iconColor: "#B69E24"
        },
        {
          id: 2,
          text: "Item 2",
          icon: "v-icon-doc-text",
          iconColor: "#B69E24"
        },
        {
          id: 3,
          text: "Item 3",
          icon: "v-icon-doc-text",
          iconColor: "#B69E24"
        }
      ])
    };
  }
};
</script>
