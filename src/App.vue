<template>
  <all-components />
</template>

<script>
import AllComponents from "@/views/all-components";

export default {
  name: "App",
  components: {
    AllComponents
  }
};
</script>

<style>
@import "./assets/css/demo";

body {
  background-color: #171717;
  color: blueviolet;
}
</style>
