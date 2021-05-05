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
      :max-height="200"
      @error="onError"
    />
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
      searchQuery: null
    };
  },
  methods: {
    onError(err) {
      console.error(err);
    },
    searchData(query) {
      if (!query) return [];
      return data
        .filter((str) => str.toLowerCase().includes(query.toLowerCase()))
        .map((str) => ({
          text: str
        }));
    },
    fetchData(searchText, reqId, token) {
      console.log("searchText", searchText, "reqId", reqId);

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
