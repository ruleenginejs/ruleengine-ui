<template>
  <v-content padding="md">
    <button @click="onChangePos">
      x: {{ nodePos1.x }}, y: {{ nodePos1.y }}
    </button>
    <br />
    <button @click="destroy = !destroy">destroy {{ destroy }}</button>
    <br />
    <button @click="destroyNode = !destroyNode">
      destroyNode {{ destroyNode }}
    </button>
    <br />
    <button @click="onChangeNodeId">change node id {{ nodeId }}</button>
    <br />
    <p>Viewport: {{ viewport }}</p>
    <p>Zoom: {{ zoom }}</p>
    <button @click="zoom = zoom + 20">+ zoom</button>
    <button @click="zoom = zoom - 20">- zoom</button>
    <br />
    <button @click="viewport = [50, 200]">change viewport</button>
    <br />
    <button @click="fitCanvas">fit canvas</button>
    <br />
    <button @click="invalidateConnection = true">
      invalidate connection {{ invalidateConnection }}
    </button>
    <br />
    <button @click="destroyConnection = !destroyConnection">
      destroyConnection {{ destroyConnection }}
    </button>
    <br />
    <button @click="portFrom = { nodeId: 4, portId: 5 }">
      chage port from {{ portFrom }}
    </button>
  </v-content>
  <v-content padding="md" style="height: 600px">
    <v-graph-canvas
      v-if="!destroy"
      v-model:viewport="viewport"
      v-model:zoom="zoom"
      :min-zoom="20"
      :edge-sizes="{ edgeBottomSize: { in: 10, out: 0 } }"
      ref="canvas"
    >
      <template #node>
        <v-graph-circle-node :id="1" :x="100" :y="100" title="s" />
        <v-graph-circle-node
          :id="2"
          :x="nodePos1.x"
          :y="nodePos1.y"
          title="error"
          error
        />
        <v-graph-node
          v-if="!destroyNode"
          :id="nodeId"
          :x="200"
          :y="20"
          title="Response"
          v-model:selected="selected"
        >
          <template #header-left-icon>
            <v-icon-doc-text />
          </template>
          <template #header-right-icon>
            <v-icon-script />
          </template>
          <template #left>
            <v-graph-port>in default</v-graph-port>
            <v-graph-port error>in error</v-graph-port>
            <v-graph-port id="200">in 200</v-graph-port>
            <v-graph-port id="404" disabled>in 404</v-graph-port>
          </template>
          <template #right>
            <v-graph-port id="outdef">out default</v-graph-port>
          </template>
        </v-graph-node>
        <v-graph-node :x="400" :y="20" title="Response" header-color="blue" />
        <v-graph-node :x="300" :y="240" title="Response" header-color="green" />
        <v-graph-node
          :id="5"
          :x="500"
          :y="340"
          title="Response"
          header-color="#82801A"
        >
          <template #left>
            <v-graph-port id="indef">in default</v-graph-port>
          </template>
        </v-graph-node>
      </template>
      <template #connection>
        <v-graph-connection
          :from="portFrom"
          :to="{ nodeId: 5, portId: 'indef' }"
          v-model:invalidate="invalidateConnection"
          v-if="!destroyConnection"
        />
        <v-graph-connection
          :from="{ nodeId: 5, portId: 8 }"
          :to="{ nodeId: 3, portId: 8 }"
        />
      </template>
    </v-graph-canvas>
  </v-content>
</template>

<script>
export default {
  name: "c-graph",
  data() {
    return {
      nodePos1: { x: 20, y: 30 },
      destroy: false,
      destroyNode: false,
      nodeId: 3,
      viewport: [0, 0],
      zoom: 100,
      invalidateConnection: true,
      portFrom: { nodeId: 3, portId: "outdef" },
      destroyConnection: false,
      selected: false
    };
  },
  methods: {
    onChangePos() {
      this.nodePos1.x = 40;
      this.nodePos1.y = 50;
    },
    onChangeNodeId() {
      this.nodeId = 4;
    },
    fitCanvas() {
      const canvas = this.$refs.canvas.getCanvas();
      canvas.fitBounds(canvas.getNodeBounds());
    }
  }
};
</script>
