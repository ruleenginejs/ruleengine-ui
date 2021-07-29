const checkbox_basic_usage_html = `
<template>
  <v-layout gutter wrap>
    <v-layout gutter="sm" w-full h-center>
      <v-checkbox id="checkbox_1" v-model="checked" />
      <v-label for="checkbox_1">Checked</v-label>
    </v-layout>
    <v-layout gutter="sm" w-full h-center>
      <v-checkbox id="checkbox_2" v-model="unchecked" />
      <v-label for="checkbox_2">Unchecked</v-label>
    </v-layout>
  </v-layout>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const checked = ref(true);
      const unchecked = ref(false);

      return {
        checked,
        unchecked
      };
    }
  }
</script>
`;

const checkbox_disabled_html = `
<template>
  <v-layout gutter wrap>
    <v-layout gutter="sm" w-full h-center>
      <v-checkbox id="checkbox_1" v-model="checked" disabled />
      <v-label for="checkbox_1">Checked</v-label>
    </v-layout>
    <v-layout gutter="sm" w-full h-center>
      <v-checkbox id="checkbox_2" v-model="unchecked" disabled />
      <v-label for="checkbox_2">Unchecked</v-label>
    </v-layout>
  </v-layout>
</template>

<script>
  import { ref } from 'vue'

  export default {
    setup() {
      const checked = ref(true);
      const unchecked = ref(false);

      return {
        checked,
        unchecked
      };
    }
  }
</script>
`;

export default [
  {
    name: "checkbox_basic_usage_html",
    code: checkbox_basic_usage_html,
    lang: "html"
  },
  {
    name: "checkbox_disabled_html",
    code: checkbox_disabled_html,
    lang: "html"
  }
]
