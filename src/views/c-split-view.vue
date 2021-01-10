<template>
  <v-content padding="md" class="h-96">
    <v-split-view>
      <v-split-pane :index="1" :size="200">Left</v-split-pane>
      <v-splitter :index="2" />
      <v-split-pane :index="3" :min-size="100">Content</v-split-pane>
      <v-splitter :index="4" />
      <v-split-pane :index="5" :size="300" :min-size="100" :max-size="500">
        Right
      </v-split-pane>
    </v-split-view>
  </v-content>
</template>

<script>
export default {
  name: "c-split-view"
};
</script>
