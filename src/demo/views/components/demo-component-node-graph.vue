<template>
  <h2>Node Graph</h2>
  <p>Graph of nodes connected via ports using connectors.</p>

  <h3>Basic Usage</h3>
  <demo-block>
    <div class="demo-cube demo-cube-h60">
      <v-graph-canvas>
        <template #node>
          <v-graph-circle-node :id="1" :x="100" :y="100" title="s">
            <template #port>
              <v-graph-port id="start_port" />
            </template>
          </v-graph-circle-node>
          <v-graph-circle-node :id="3" :x="650" :y="100" title="e">
            <template #port>
              <v-graph-port id="end_port" />
            </template>
          </v-graph-circle-node>
          <v-graph-node :id="2" :x="300" :y="10" title="Simple Node">
            <template #header-left-icon>
              <v-icon-doc-text />
            </template>
            <template #header-right-icon>
              <v-icon-script />
            </template>
            <template #left>
              <v-graph-port id="in_port" direction="left">
                in port
              </v-graph-port>
            </template>
            <template #right>
              <v-graph-port id="out_port" direction="right">
                out port
              </v-graph-port>
            </template>
          </v-graph-node>
        </template>
        <template #connection>
          <v-graph-connection
            :from="{ nodeId: 1, portId: 'start_port' }"
            :to="{ nodeId: 2, portId: 'in_port' }"
          />
          <v-graph-connection
            :from="{ nodeId: 2, portId: 'out_port' }"
            :to="{ nodeId: 3, portId: 'end_port' }"
          />
        </template>
      </v-graph-canvas>
    </div>
    <template #code>
      <demo-code name="node_graph_basic_usage_html" />
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from "../demo-code";

export default {
  name: "demo-component-node-graph",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
