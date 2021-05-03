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
    <div>Autocomplete:</div>
    <v-autocomplete
      placeholder="Enter relative path"
      :data-source="fetchAutocompleteData"
    />
  </v-content>
</template>

<script>
export default {
  name: "c-form",
  data() {
    return {
      form: {
        text: null,
        selectValue: { value: "2" }
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
    fetchAutocompleteData(searchText) {
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
