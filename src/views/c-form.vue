<template>
  <div class="w-1/3">
    <h4>Form</h4>
    <v-input v-model="form.text" type="text" />
    <p>Text: {{ form.text }}</p>
    <v-input v-model="form.text" icon-clickable type="text">
      <template #icon>
        <span>Ic</span>
      </template>
    </v-input>
  </div>
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
