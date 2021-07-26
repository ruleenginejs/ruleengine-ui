<template>
  <highlightjs
    v-if="content"
    :autodetect="false"
    :language="language"
    :code="content"
  />
</template>

<script>
import { computed, toRefs } from "vue";
import demoCodes from "./demo-codes";

export default {
  name: "demo-code",
  props: {
    lang: {
      type: String,
      default: null
    },
    code: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { lang, code, name } = toRefs(props);
    const predefined = computed(() =>
      demoCodes.find((c) => c.name === name.value)
    );
    const content = computed(() => code.value || predefined.value?.code.trim());
    const language = computed(() => lang.value || predefined.value?.lang);

    return {
      content,
      language
    };
  }
};
</script>
