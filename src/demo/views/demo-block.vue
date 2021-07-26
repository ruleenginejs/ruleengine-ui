<template>
  <div class="demo-block">
    <div class="demo-block__source">
      <slot />
    </div>
    <div class="demo-block__code">
      <v-sidebar-section
        :bottom-border="false"
        :header-border="false"
        title="Code"
      >
        <slot name="code"/>
      </v-sidebar-section>
    </div>
  </div>
</template>

<script>
export default {
  name: "demo-block"
};
</script>
