<template>
  <div class="demo-theme-switcher">
    <div class="demo-theme-switcher__label">Theme</div>
    <div class="demo-theme-switcher__select">
      <v-select-box v-model="selectedItem" :items="themes" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, watch } from "vue";

export default {
  name: "demo-theme-switcher",
  setup() {
    const selectedItem = ref("vscode-dark");

    const themes = reactive([
      {
        text: "Dark+ (default dark)",
        value: "vscode-dark"
      },
      {
        text: "Light+ (default light)",
        value: "vscode-light"
      }
    ]);

    watch(selectedItem, (newValue, oldValue) => {
      document.documentElement.classList.remove(oldValue);
      document.documentElement.classList.add(newValue);
    });

    return {
      selectedItem,
      themes
    };
  }
};
</script>
