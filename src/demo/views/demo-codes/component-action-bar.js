const actionbar_basic_usage_html = `
<template>
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
</template>
`;

const actionbar_disabled_action_usage_html = `
<template>
  <v-action-bar>
    <v-action @click="onClick">
      <v-icon-play />
    </v-action>
    <v-action disabled @click="onClick">
      <v-icon-stop />
    </v-action>
  </v-action-bar>
</template>
`;

const actionbar_grouping_action_usage_html = `
<template>
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
</template>
`;

export default [
  {
    name: "actionbar_basic_usage_html",
    code: actionbar_basic_usage_html,
    lang: "html"
  },
  {
    name: "actionbar_disabled_action_usage_html",
    code: actionbar_disabled_action_usage_html,
    lang: "html"
  },
  {
    name: "actionbar_grouping_action_usage_html",
    code: actionbar_grouping_action_usage_html,
    lang: "html"
  }
]
