<template>
  <v-content padding="md" class="w-1/3">
    <v-button id="button-1" @click="dropdownVisible = !dropdownVisible">
      Toggle Dropdown
    </v-button>
    <v-dropdown
      v-if="!destroyDropdown"
      v-model:visible="dropdownVisible"
      anchor="button-1"
      anchor-constraint
      :offset-y="2"
    >
      <v-list :items="items" />
    </v-dropdown>
    <a @click="destroyDropdown = true">Destroy Dropdown</a>
  </v-content>
</template>

<script>
export default {
  name: "c-dropdown",
  data() {
    return {
      destroyDropdown: false,
      dropdownVisible: false,
      items: [
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
      ]
    };
  }
};
</script>
