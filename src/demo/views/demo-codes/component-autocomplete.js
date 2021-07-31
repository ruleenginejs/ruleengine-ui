const autocomplete_basic_usage_html = `
<template>
  <v-autocomplete
    placeholder="Enter your text"
    v-model="value"
    :data-source="fetchAutocompleteData"
    loading-message="Loading..."
    empty-result-message="No matching results."
  />
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const value = ref("");
      const items = ref([
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
          ? items.value.filter((item) =>
              item.text.toLowerCase().includes(query.toLowerCase())
            )
          : items.value;
      };

      const fetchAutocompleteData = (query, requestId, token) => {
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

      return {
        value,
        fetchAutocompleteData
      };
    }
  }
</script>
`;

const autocomplete_disabled_usage_html = `
<template>
  <v-autocomplete placeholder="Enter your text" disabled />
</template>
`;

const autocomplete_with_icon_usage_html = `
<template>
  <v-autocomplete
    placeholder="Enter your text"
    icon-clickable
    @icon-click="onClick"
  >
    <template #icon>
      <span class="codicon codicon-file-code"></span>
    </template>
  </v-autocomplete>
</template>
`;

export default [
  {
    name: "autocomplete_basic_usage_html",
    code: autocomplete_basic_usage_html,
    lang: "html"
  },
  {
    name: "autocomplete_disabled_usage_html",
    code: autocomplete_disabled_usage_html,
    lang: "html"
  },
  {
    name: "autocomplete_with_icon_usage_html",
    code: autocomplete_with_icon_usage_html,
    lang: "html"
  }
]
