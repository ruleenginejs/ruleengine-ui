<template>
  <v-content padding="md">
    <button @click="onChangePos">
      x: {{ nodePos1.x }}, y: {{ nodePos1.y }}
    </button>
  </v-content>
  <v-content padding="md" style="height: 600px">
    <v-graph-canvas>
      <v-graph-circle-node :x="100" :y="100" title="S" />
      <v-graph-circle-node :x="nodePos1.x" :y="nodePos1.y" title="ERROR" error />
    </v-graph-canvas>
  </v-content>
</template>

<script>
export default {
  name: "c-graph",
  data() {
    return {
      nodePos1: { x: 20, y: 30 }
    };
  },
  methods: {
    onChangePos() {
      this.nodePos1.x = 40;
      this.nodePos1.y = 50;
    }
  }
};
</script>
