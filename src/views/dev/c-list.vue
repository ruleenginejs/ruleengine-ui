<template>
  <v-content padding="md" class="w-1/3">
    <div>List:</div>
    <v-content scroll class="h-40">
      <v-list
        :items="items"
        v-model:selected="selectedItem"
        v-model:focused="focusedItem"
        v-model:focus-index="focusIndex"
        focusLoop
      />
    </v-content>
    <div>Selected item: {{ selectedItem }}</div>
    <div>Focused item: {{ focusedItem }}</div>
    <div>Focus index: {{ focusIndex }}</div>
    <div @click="focusIndex++">Forward focus</div>
    <div @click="focusIndex--">Backward focus</div>
  </v-content>
</template>

<script>
const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    id: i,
    text: `Item ${i}`,
    icon: "v-icon-doc-text",
    iconColor: "#B69E24"
  });
}

export default {
  name: "c-list",
  data() {
    return {
      selectedItem: { id: 3 },
      focusedItem: null,
      focusIndex: 40,
      items: data
    };
  }
};
</script>
