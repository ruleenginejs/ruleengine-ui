<template>
  <v-content padding="md">
    <button @click="onChangePos">
      x: {{ nodePos1.x }}, y: {{ nodePos1.y }}
    </button>
  </v-content>
  <v-content padding="md" style="height: 600px">
    <v-graph-canvas>
      <v-graph-circle-node :id="1" :x="100" :y="100" title="s" />
      <v-graph-circle-node
        :id="2"
        :x="nodePos1.x"
        :y="nodePos1.y"
        title="error"
        error
      />
      <v-graph-node :id="3" :x="200" :y="20" title="Response">
        <template #header-left-icon>
          <v-icon-doc-text />
        </template>
        <template #header-right-icon>
          <v-icon-script />
        </template>
        <template #left>
          <v-graph-port id="in-default">in default</v-graph-port>
          <v-graph-port id="in-error" error>in error</v-graph-port>
          <v-graph-port id="in-200">in 200</v-graph-port>
          <v-graph-port id="in-404" disabled>in 404</v-graph-port>
        </template>
        <template #right>
          <v-graph-port id="out-default">out default</v-graph-port>
        </template>
      </v-graph-node>
      <v-graph-connection from="1:default" to="3:in-default" />
      <v-graph-connection from="3:out-default" to="2:default" />
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
