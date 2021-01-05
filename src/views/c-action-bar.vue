<template>
  <v-content padding="md" class="w-1/2">
    <v-action-bar>
      <v-action-group>
        <v-action @click="onClick">
          <v-icon-play />
        </v-action>
        <v-action @click="onClick">
          <v-icon-stop />
        </v-action>
      </v-action-group>
      <v-action disabled @click="onClick">
        <v-icon-stop />
      </v-action>
      <v-action-group>
        <v-action @click="onClick">
          <v-icon-stop />
        </v-action>
        <v-action @click="onClick">
          <v-icon-stop />
        </v-action>
      </v-action-group>
      <v-action-group>
        <v-action @click="onClick">
          <v-icon-stop />
        </v-action>
        <v-action @click="onClick">
          <v-icon-stop />
        </v-action>
      </v-action-group>
    </v-action-bar>
    <v-action-bar l-border>
      <v-action>
        <v-icon-stop />
      </v-action>
      <v-action>
        <v-icon-stop />
      </v-action>
    </v-action-bar>
    <v-action-bar r-border>
      <v-action>
        <v-icon-stop />
      </v-action>
      <v-action>
        <v-icon-stop />
      </v-action>
    </v-action-bar>
  </v-content>
</template>

<script>
export default {
  name: "c-action-bar",
  methods: {
    onClick() {
      alert(1);
    }
  }
};
</script>
