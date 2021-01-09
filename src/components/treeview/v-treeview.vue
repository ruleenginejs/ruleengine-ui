<template>
  <div v-if="items.length" class="v-treeview">
    <v-tree-item
      v-for="(child, index) in items"
      :key="child.id || index"
      :item="child"
      :depth="0"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import VTreeItem from "./v-tree-item";

export default {
  name: "v-treeview",
  components: {
    VTreeItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ["select"],
  setup(props, { emit }) {
    const selectedItem = ref(null);

    const onSelect = (e) => {
      if (e.item.children) {
        e.item.expanded = !e.item.expanded;
      }

      if (e.depth > 0) {
        if (selectedItem.value) {
          selectedItem.value.selected = false;
        }
        e.item.selected = true;
        selectedItem.value = e.item;

        emit("select", e.item);
      }
    };

    return {
      onSelect
    };
  }
};
</script>
