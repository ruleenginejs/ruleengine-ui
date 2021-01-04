<template>
  <v-content class="w-1/3">
    <h4>Form</h4>
    <v-input v-model="form.text" type="text" />
    <p>Text: {{ form.text }}</p>
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
    <v-label>Readonly:</v-label>
    <v-input v-model="form.text" readonly icon-clickable type="text">
      <template #icon>
        <v-icon-file-menu />
      </template>
    </v-input>
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
