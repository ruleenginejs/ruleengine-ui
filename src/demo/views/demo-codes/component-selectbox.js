const selectbox_basic_usage_html = `
<template>
  <v-select-box v-model="value" :items="options" />
</template>

<script>
  import { ref, reactive } from 'vue';

  export default {
    setup() {
      const value = ref("Option 1");
      const options = reactive([
        {
          text: "Option 1",
          value: "Option 1"
        },
        {
          text: "Option 2",
          value: "Option 2"
        },
        {
          text: "Option 3",
          value: "Option 3"
        },
        {
          text: "Option 4",
          value: "Option 4"
        },
        {
          text: "Option 5",
          value: "Option 5"
        }
      ]);

      return {
        options,
        value
      };
    }
  }
</script>
`;

const selectbox_disabled_usage_html = `
<template>
  <v-select-box v-model="value" :items="options" disabled />
</template>

<script>
  import { ref, reactive } from 'vue';

  export default {
    setup() {
      const value = ref("Option 1");
      const options = reactive([
        {
          text: "Option 1",
          value: "Option 1"
        },
        {
          text: "Option 2",
          value: "Option 2"
        },
        {
          text: "Option 3",
          value: "Option 3"
        },
        {
          text: "Option 4",
          value: "Option 4"
        },
        {
          text: "Option 5",
          value: "Option 5"
        }
      ]);

      return {
        options,
        value
      };
    }
  }
</script>
`;

export default [
  {
    name: "selectbox_basic_usage_html",
    code: selectbox_basic_usage_html,
    lang: "html"
  },
  {
    name: "selectbox_disabled_usage_html",
    code: selectbox_disabled_usage_html,
    lang: "html"
  }
]
