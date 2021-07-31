<template>
  <h2>ActionBar</h2>

  <h3>Basic Usage</h3>
  <demo-block>
    <v-action-bar>
      <v-action @click="onClick">
        <v-icon-play />
      </v-action>
      <v-action @click="onClick">
        <v-icon-stop />
      </v-action>
      <v-action @click="onClick">
        <v-icon-plus />
      </v-action>
      <v-action @click="onClick">
        <v-icon-folder />
      </v-action>
    </v-action-bar>
    <template #code>
      <demo-code name="actionbar_basic_usage_html" />
    </template>
  </demo-block>

  <h3>Disabled Action</h3>
  <demo-block>
    <v-action-bar>
      <v-action @click="onClick">
        <v-icon-play />
      </v-action>
      <v-action disabled @click="onClick">
        <v-icon-stop />
      </v-action>
    </v-action-bar>
    <template #code>
      <demo-code name="actionbar_disabled_action_usage_html" />
    </template>
  </demo-block>

  <h3>Grouping Action</h3>
  <demo-block>
    <v-action-bar>
      <v-action-group>
        <v-action @click="onClick">
          <span class="codicon codicon-play" />
        </v-action>
        <v-action @click="onClick">
          <span class="codicon codicon-stop" />
        </v-action>
      </v-action-group>
      <v-action @click="onClick">
        <span class="codicon codicon-plus" />
      </v-action>
      <v-action-group>
        <v-action @click="onClick">
          <span class="codicon codicon-zoom-in" />
        </v-action>
        <v-action @click="onClick">
          <span class="codicon codicon-zoom-out" />
        </v-action>
      </v-action-group>
    </v-action-bar>
    <template #code>
      <demo-code name="actionbar_grouping_action_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-action-bar",
  components: {
    DemoBlock,
    DemoCode
  },
  setup() {
    return {
      onClick: () => {}
    };
  }
};
</script>
