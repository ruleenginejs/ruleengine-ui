<template>
  <v-content padding="md" class="w-1/2">
    <v-sidebar class="h-96">
      <v-sidebar-section
        title="Title"
        h-full
        :expandable="false"
        :bottom-border="false"
      >
        <v-content scroll="sm" h-full>
          <v-treeview :items="items" />
        </v-content>
      </v-sidebar-section>
    </v-sidebar>
  </v-content>
</template>

<script>
function generateItems() {
  const items = [];
  for (let i = 1; i < 30; i++) {
    items.push({
      id: 5 + i,
      name: "file " + i,
      icon: "v-icon-doc-text",
      iconColor: "#B69E24",
      expanded: false,
      selected: false
    });
  }
  return items;
}

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
            },
            {
              id: 500,
              name: "folder 500",
              icon: "v-icon-folder",
              expanded: false,
              selected: false,
              children: []
            },
            ...generateItems()
          ]
        }
      ]
    };
  }
};
</script>
