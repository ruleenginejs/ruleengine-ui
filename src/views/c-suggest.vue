<template>
  <v-content padding="md" class="w-1/3">
    <div>Suggestion:</div>
    <div @click="destroy = !destroy">Toggle</div>
    <v-input
      v-model="searchQuery"
      placeholder="Enter your text"
      id="input-10"
    />
    <v-suggest
      v-if="!destroy"
      v-model:visible="suggestVisible"
      anchor="input-10"
      anchor-constraint
      :search-query="searchQuery"
      :data-source="fetchData"
      action-when-parent-scrolling="update"
      loading-message="Loading..."
      empty-result-message="No suggestions."
    />
  </v-content>
</template>

<script>
export default {
  name: "c-form",
  data() {
    return {
      destroy: false,
      suggestVisible: true,
      searchQuery: null
    };
  },
  methods: {
    fetchData(searchText) {
      console.log(searchText);
      return Promise.resolve([
        {
          text: "Item 1"
        },
        {
          text: "Item 2"
        }
      ]);
    }
  }
};
</script>
