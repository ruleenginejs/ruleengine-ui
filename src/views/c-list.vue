<template>
  <v-content padding="md" class="w-1/3">
    <v-list v-model:selected-item="selectedItem" :items="items"/>
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
          text: "Item 1"
        },
        {
          text: "Item 2"
        },
        {
          text: "Item 3"
        }
      ]
    }
  }
};
</script>
