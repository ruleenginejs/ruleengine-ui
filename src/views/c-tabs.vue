<template>
  <v-content class="w-1/2">
    <v-tabs>
      <v-tab icon-color="#B69E24" modified @close="onClose">
        File Name.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab>
        <template #default>File Name.txt</template>
        <template #icon>
          <v-icon-play />
        </template>
      </v-tab>
      <v-tab icon-color="#B69E24">
        File Name.txt
        <template #icon>
          <v-icon-stop />
        </template>
      </v-tab>
      <v-tab>
        File Name.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab icon-color="#B69E24">
        File Name.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
      <v-tab icon-color="#B69E24">
        File Name.txt
        <template #icon>
          <v-icon-book />
        </template>
      </v-tab>
    </v-tabs>
  </v-content>
</template>

<script>
export default {
  name: "c-tabs",
  methods: {
    onClose() {
      alert(1);
    }
  }
};
</script>
