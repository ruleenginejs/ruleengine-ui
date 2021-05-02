<template>
  <v-content padding="md" class="w-1/3">
    <div>List:</div>
    <v-list :items="items" v-model:selected="selectedItem" mouse-enabled />
    <div>Selected item: {{ selectedItem }}</div>
  </v-content>
</template>

<script>
export default {
  name: "c-list",
  data() {
    return {
      selectedItem: { id: 3 },
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
