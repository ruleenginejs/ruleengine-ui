<template>
  <v-content padding="md" class="w-1/2">
    <v-sidebar class="h-96">
      <v-sidebar-section title="Title" expand>
        <v-treeview :items="items" />
      </v-sidebar-section>
    </v-sidebar>
  </v-content>
</template>

<script>
export default {
  name: "c-treeview",
  data() {
    return {
      items: [
        {
          id: 1,
          name: "Root folder",
          expanded: true,
          selected: false,
          children: [
            {
              id: 2,
              name: "Folder",
              expanded: false,
              selected: false,
              icon: "v-icon-folder",
              iconColor: "#B69E24",
              children: [
                {
                  id: 3,
                  name: "file 1",
                  icon: "v-icon-doc-text",
                  iconColor: "#B69E24",
                  expanded: false,
                  selected: false
                },
                {
                  id: 4,
                  name: "file 2",
                  icon: "v-icon-doc-text",
                  iconColor: "#B69E24",
                  expanded: false,
                  selected: false
                }
              ]
            },
            {
              id: 5,
              name: "file 3",
              icon: "v-icon-doc-text",
              iconColor: "#B69E24",
              expanded: false,
              selected: false
            }
          ]
        }
      ]
    };
  }
};
</script>
