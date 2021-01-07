<template>
  <c-form />
  <c-action-bar />
  <c-tabs />
</template>

<script>
import CForm from "./c-form";
import CActionBar from "./c-action-bar";
import CTabs from "./c-tabs";

export default {
  name: "all-components",
  components: {
    CForm,
    CActionBar,
    CTabs
  }
};
</script>
