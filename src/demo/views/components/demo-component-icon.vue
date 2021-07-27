<template>
  <h2>Icon</h2>
  <p>Library provides some svg icons.</p>

  <h3>Built-in Icons</h3>
  <demo-block>
    <v-layout gutter wrap>
      <v-icon-book />
      <v-icon-checkmark />
      <v-icon-chevron-down />
      <v-icon-circle />
      <v-icon-close />
      <v-icon-doc-text />
      <v-icon-file-menu />
      <v-icon-folder />
      <v-icon-play />
      <v-icon-stop />
      <v-icon-plus-bold />
      <v-icon-plus />
      <v-icon-script />
      <v-icon-sidebar-left />
      <v-icon-sidebar-right />
    </v-layout>
    <template #code>
      <demo-code name="icon_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Codicons</h3>
  <p>
    The
    <a
      href="https://github.com/microsoft/vscode-codicons"
      class="demo-external-link"
      target="_blank"
      >Codicon library</a
    >
    contains all the icons used in VS Code.
    <a
      href="https://code.visualstudio.com/api/references/icons-in-labels#icon-listing"
      class="demo-external-link"
      target="_blank"
      >All list of icons</a
    >.
  </p>
  <demo-block>
    <v-layout gutter wrap>
      <i class="codicon codicon-account" />
      <i class="codicon codicon-activate-breakpoints" />
      <i class="codicon codicon-add" />
      <i class="codicon codicon-alert" />
      <i class="codicon codicon-archive" />
      <i class="codicon codicon-array" />
    </v-layout>
    <template #code>
      <demo-code name="codicons_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-space",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
