<template>
  <v-content padding="md" class="w-1/3">
    <div>Suggestion:</div>
    <div @click="destroy = !destroy">Toggle</div>
    <div @click="suggestVisible = !suggestVisible">Toggle Visible</div>
    <v-input
      v-model="searchQuery"
      placeholder="Enter your text"
      id="input-10"
    />
    <v-suggest
      v-if="!destroy"
      v-model:visible="suggestVisible"
      anchor="input-10"
      :anchor-constraint="false"
      :search-query="searchQuery"
      :data-source="fetchData"
      action-on-parent-scrolling="update"
      loading-message="Loading..."
      empty-result-message="No suggestions."
      :max-item-count="20"
      clear-on-invisible
      @error="onError"
      @select="onSuggestionSelected"
    />
    <div>Selected: {{ selectedItem }}</div>
  </v-content>
</template>

<script>
const data = [];
for (let i = 0; i < 1000; i++) {
  data.push(`Item ${i}`);
}

export default {
  name: "c-form",
  data() {
    return {
      destroy: false,
      suggestVisible: true,
      searchQuery: null,
      selectedItem: null
    };
  },
  methods: {
    onError(err) {
      console.error(err);
    },
    onSuggestionSelected(e) {
      this.selectedItem = e;
    },
    searchData(query) {
      if (!query) return [];
      return data
        .filter((str) => str.toLowerCase().includes(query.toLowerCase()))
        .map((str) => ({
          text: str
        }));
    },
    fetchData(searchText, requestId, token) {
      console.log("searchText", searchText, "requestId", requestId);

      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          console.log("fetchData resolved");
          resolve(this.searchData(searchText));
        }, 300);

        token.onCancellationRequested(() => {
          console.log("fetchData cancelled");
          clearTimeout(timer);
          resolve();
        });
      });
    }
  }
};
</script>
