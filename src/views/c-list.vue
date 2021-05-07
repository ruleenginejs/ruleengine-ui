<template>
  <v-content padding="md" class="w-1/3">
    <div>List:</div>
    <v-list
      :items="items"
      v-model:selected="selectedItem"
      v-model:focused="focusedItem"
      v-model:focus-index="focusIndex"
      focusLoop
    />
    <div>Selected item: {{ selectedItem }}</div>
    <div>Focused item: {{ focusedItem }}</div>
    <div>Focus index: {{ focusIndex }}</div>
    <div @click="focusIndex++">Forward focus</div>
    <div @click="focusIndex--">Backward focus</div>
  </v-content>
</template>

<script>
export default {
  name: "c-list",
  data() {
    return {
      selectedItem: { id: 3 },
      focusedItem: null,
      focusIndex: 0,
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
