const suggest_basic_usage_html = `
<template>
  <v-layout gutter>
    <v-button @click="suggestOpen = !suggestOpen">Toggle Suggest</v-button>
    <v-input v-model="queryText" placeholder="Enter your text" id="input-1" />
    <v-suggest
      v-model:visible="suggestOpen"
      anchor="input-1"
      :anchor-constraint="false"
      :search-query="queryText"
      :data-source="fetchData"
      action-on-parent-scrolling="update"
      loading-message="Loading..."
      empty-result-message="No suggestions."
      :max-item-count="20"
      clear-on-invisible
      @error="onError"
      @select="onSuggestionSelected"
    />
  </v-layout>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const suggestOpen = ref(false);
      const queryText = ref("");
      const suggestionItems = ref([
        {
          text: "Vue.js"
        },
        {
          text: "React"
        },
        {
          text: "Angular"
        },
        {
          text: "Ember.js"
        },
        {
          text: "Meteor"
        },
        {
          text: "Polymer"
        },
        {
          text: "Backbone.js"
        }
      ]);

      const searchData = (query) => {
        return query
          ? suggestionItems.value.filter((item) =>
              item.text.toLowerCase().includes(query.toLowerCase())
            )
          : suggestionItems.value;
      };

      const fetchData = (query, requestId, token) => {
        return new Promise((resolve) => {
          const timer = setTimeout(() => {
            resolve(searchData(query));
          }, 100);

          token.onCancellationRequested(() => {
            clearTimeout(timer);
            resolve();
          });
        });
      };

      const onError = () => {};
      const onSuggestionSelected = (item) => {
        queryText.value = item.text;
        suggestOpen.value = false;
      };

      return {
        suggestOpen,
        queryText,
        fetchData,
        onError,
        onSuggestionSelected
      };
    }
  }
</script>
`;

export default [
  {
    name: "suggest_basic_usage_html",
    code: suggest_basic_usage_html,
    lang: "html"
  }
]
