<template>
  <v-content class="w-1/3">
    <v-label>Form</v-label>
    <v-input v-model="form.text" type="text" />
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
      <v-input class-name="w-1/2" v-model="form.text" readonly icon-clickable type="text">
        <template #icon>
          <v-icon-file-menu />
        </template>
      </v-input>
    </v-layout>
  </v-content>
</template>

<script>
export default {
  name: "c-form",
  data() {
    return {
      form: {
        text: null
      }
    };
  }
};
</script>
