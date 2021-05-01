<template>
  <v-content padding="md" class="w-1/3">
    <div>List:</div>
    <v-list :items="items" />
  </v-content>
</template>

<script>
export default {
  name: "c-list",
  data() {
    return {
      selectedItem: null,
      items: [
        {
          text: "Item 1",
          icon: "v-icon-doc-text",
          iconColor: "#B69E24"
        },
        {
          text: "Item 2",
          icon: "v-icon-doc-text",
          iconColor: "#B69E24"
        },
        {
          text: "Item 3",
          icon: "v-icon-doc-text",
          iconColor: "#B69E24"
        }
      ]
    };
  }
};
</script>
