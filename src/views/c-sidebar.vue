<template>
  <v-content padding="md" class="w-1/2">
    <v-sidebar rt-border>
      <v-sidebar-section title="Title">
        <div>Content</div>
      </v-sidebar-section>
      <v-sidebar-section title="Title" header-compact :bottom-border="false">
        <div>Content</div>
      </v-sidebar-section>
      <v-sidebar-section title="Title" :expandable="false">
        <div>Content</div>
      </v-sidebar-section>
       <v-sidebar-section title="Title" expand>
        <div>Content</div>
      </v-sidebar-section>
    </v-sidebar>
  </v-content>
</template>

<script>
export default {
  name: "c-sidebar"
};
</script>
