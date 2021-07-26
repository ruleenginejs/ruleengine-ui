<template>
  <h2>Layout</h2>
  <p>Quickly create layouts with no styling on flex.</p>
  <h3>Basic layout</h3>
  <demo-block>
    <v-layout/>
    <template #code>
      <demo-code name="basic_layout_html"/>
    </template>
  </demo-block>
</template>

<script>
import DemoBlock from "../demo-block";
import DemoCode from '../demo-code';

export default {
  name: "demo-component-layout",
  components: {
    DemoBlock,
    DemoCode
  }
};
</script>
