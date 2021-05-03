<template>
  <div class="v-autocomplete">
    <v-input autocomplete="off" :placeholder="placeholder" />
  </div>
</template>

<script>
import { toRefs } from "vue";
import { VInput } from "@/components/input";
import useAutocomplete from "./use-autocomplete";

export default {
  name: "v-autocomplete",
  components: {
    VInput
  },
  props: {
    dataSource: {
      type: Function,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    loadingMessage: {
      type: String,
      default: null
    },
    emptyResultMessage: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const { dataSource } = toRefs(props);
    useAutocomplete({ dataSource });
  }
};
</script>

<style>
@import "autocomplete";
</style>
