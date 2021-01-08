<template>
  <c-form />
  <c-action-bar />
  <c-tabs />
  <c-sidebar />
</template>

<script>
import CForm from "./c-form";
import CActionBar from "./c-action-bar";
import CTabs from "./c-tabs";
import CSidebar from './c-sidebar';

export default {
  name: "all-components",
  components: {
    CForm,
    CActionBar,
    CTabs,
    CSidebar
  }
};
</script>
