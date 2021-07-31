<template>
  <v-content padding="md" class="w-1/3">
    <v-label>Form</v-label>
    <v-input v-model="form.text" type="text" placeholder="Enter your text" />
    <v-label>Text: {{ form.text }}</v-label>
    <v-input v-model="form.text" icon-clickable type="text">
      <template #icon>
        <v-icon-file-menu />
      </template>
    </v-input>
    <v-label>Disabled:</v-label>
    <v-input v-model="form.text" disabled type="text">
      <template #icon>
        <v-icon-file-menu />
      </template>
    </v-input>
    <v-layout h-center>
      <v-label class="w-1/2">Readonly:</v-label>
      <v-input
        class-name="w-1/2"
        v-model="form.text"
        readonly
        icon-clickable
        type="text"
      >
        <template #icon>
          <v-icon-file-menu />
        </template>
      </v-input>
    </v-layout>
    <v-layout h-center>
      <v-label class="w-1/2">Select:</v-label>
      <v-select-box
        :items="selectItems"
        value-as-object
        v-model="form.selectValue"
      />
    </v-layout>
    <v-layout h-center>
      <v-label class="w-1/2">Disabled select:</v-label>
      <v-select-box :items="selectItems" disabled />
    </v-layout>
    <div>Select: {{ form.selectValue }}</div>
    <div>
      <v-button>Save</v-button>
      <v-button secondary>Cancel</v-button>
    </div>
    <div>
      <v-button disabled>Save</v-button>
      <v-button disabled secondary>Cancel</v-button>
    </div>
    <div>Autocomplete: {{ form.autocompleteValue }}</div>
    <v-autocomplete
      placeholder="Enter relative path"
      v-model="form.autocompleteValue"
      :data-source="fetchAutocompleteData"
      loading-message="Loading..."
      empty-result-message="No matching results."
      icon-clickable
      @icon-click="onAutocompleteIconClick"
    >
      <template #icon>
        <span class="codicon codicon-file-code"></span>
      </template>
    </v-autocomplete>
    <div>Checkbox: {{ form.checked1 }} : {{ form.checked2 }}</div>
    <v-checkbox v-model="form.checked1" />
    <v-checkbox v-model="form.checked2" />
    <v-checkbox :model-value="true" disabled />
    <v-checkbox :model-value="false" disabled />
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
      form: {
        text: null,
        selectValue: { value: "2" },
        autocompleteValue: null,
        checked1: true,
        checked2: false
      },
      selectItems: [
        {
          value: "1",
          text: "Item 1"
        },
        {
          value: "2",
          text: "Item 2"
        }
      ]
    };
  },
  methods: {
    searchData(query) {
      if (!query) return [];
      return data
        .filter((str) => str.toLowerCase().includes(query.toLowerCase()))
        .map((str) => ({
          text: str
        }));
    },
    fetchAutocompleteData(searchText, requestId, token) {
      console.log("searchText", searchText, "requestId", requestId);

      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          console.log("fetchAutocompleteData resolved");
          resolve(this.searchData(searchText));
        }, 300);

        token.onCancellationRequested(() => {
          console.log("fetchAutocompleteData cancelled");
          clearTimeout(timer);
          resolve();
        });
      });
    },
    onAutocompleteIconClick(e) {
      console.log(e);
    }
  }
};
</script>
