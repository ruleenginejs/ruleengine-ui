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
    <br />
    <button @click="portDisabled = !portDisabled">
      portDisabled {{ portDisabled }}
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
        <v-graph-circle-node
          :id="1"
          :x="100"
          :y="100"
          title="s"
          @new-link="onNodeNewlink"
        >
          <template #port>
            <v-graph-port id="s" />
          </template>
        </v-graph-circle-node>
        <v-graph-circle-node
          :id="2"
          :x="nodePos1.x"
          :y="nodePos1.y"
          title="error"
          error
          @new-link="onNodeNewlink"
        >
          <template #port>
            <v-graph-port id="e" />
          </template>
        </v-graph-circle-node>
        <v-graph-node
          v-if="!destroyNode"
          :id="nodeId"
          :x="200"
          :y="20"
          title="Response"
          v-model:selected="selected"
          @new-link="onNodeNewlink"
        >
          <template #header-left-icon>
            <v-icon-doc-text />
          </template>
          <template #header-right-icon>
            <v-icon-script />
          </template>
          <template #left>
            <v-graph-port
              :link-limit="1"
              @new-link="onNewLink"
              v-model:selected="portSelected"
              direction="left"
            >
              in default
            </v-graph-port>
            <v-graph-port
              :link-limit="1"
              @new-link="onNewLink"
              error
              v-model:selected="portSelected2"
              direction="left"
            >
              in error
            </v-graph-port>
            <v-graph-port
              :link-limit="1"
              @new-link="onNewLink"
              id="200"
              v-model:selected="portSelected3"
              direction="left"
            >
              in 200
            </v-graph-port>
            <v-graph-port
              id="404"
              :link-limit="1"
              :disabled="portDisabled"
              @new-link="onNewLink"
              direction="left"
            >
              in 404
            </v-graph-port>
            <v-graph-port id="500" :link-limit="1" @new-link="onNewLink" />
          </template>
          <template #right>
            <v-graph-port
              @new-link="onNewLink"
              id="outdef"
              :link-limit="1"
              direction="right"
            >
              out default
            </v-graph-port>
            <v-graph-port
              id="501"
              :link-limit="1"
              @new-link="onNewLink"
              direction="right"
            />
          </template>
        </v-graph-node>
        <v-graph-node
          @new-link="onNodeNewlink"
          :x="400"
          :y="20"
          title="Response"
          header-color="blue"
        />
        <v-graph-node
          @new-link="onNodeNewlink"
          :x="300"
          :y="240"
          title="Response"
          header-color="green"
        />
        <v-graph-node
          :id="5"
          :x="500"
          :y="340"
          title="Response"
          header-color="#82801A"
          @new-link="onNodeNewlink"
        >
          <template #left>
            <v-graph-port
              @new-link="onNewLink"
              :link-limit="1"
              id="indef"
              direction="left"
            >
              in default
            </v-graph-port>
          </template>
          <template #right>
            <v-graph-port
              @new-link="onNewLink"
              :link-limit="1"
              id="indef2"
              direction="right"
            >
              in default
            </v-graph-port>
          </template>
        </v-graph-node>
      </template>
      <template #connection>
        <!--
          <v-graph-connection
          key="defconn1"
          :from="portFrom"
          :to="{ nodeId: 5, portId: 'indef' }"
          v-model:invalidate="invalidateConnection"
          v-if="!destroyConnection"
        />
        -->
        <v-graph-connection
          v-for="(conn, index) in connections"
          :key="index"
          :from="conn.from"
          :to="conn.to"
          v-model:selected="conn.selected"
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
      selected: false,
      portDisabled: true,
      connections: [],
      portSelected: false,
      portSelected2: false,
      portSelected3: false
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
    },
    onNodeNewlink(e) {
      console.log(e);
    },
    onNewLink(e) {
      this.connections.push({ from: e.from, to: e.to, selected: false });
    }
  }
};
</script>
