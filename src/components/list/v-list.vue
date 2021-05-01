<template>
  <div
    class="v-list"
    :class="{ 'v-list--disabled': disabled }"
    :tabindex="tabIndex"
  >
    <v-list-item
      v-for="item in displayItems"
      :key="item.id"
      :text="item.text"
      :icon="item.icon"
      :icon-color="item.iconColor"
      :selected="item.selected"
      :focused="item.focused"
      :disabled="item.disabled"
    />
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
import useList from "./use-list";
import VListItem from "./v-list-item";

export default {
  name: "v-list",
  components: {
    VListItem
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    tabIndex: {
      type: Number,
      default: -1
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Object,
      default: null
    },
    idField: {
      type: String,
      default: "id"
    },
    displayField: {
      type: String,
      default: "text"
    },
    detailField: {
      type: String,
      default: "detail"
    },
    disabledField: {
      type: String,
      default: "disabled"
    },
    iconField: {
      type: String,
      default: "icon"
    },
    iconColorField: {
      type: String,
      default: "iconColor"
    }
  },
  emits: ["update:selected"],
  setup(props, { emit }) {
    const {
      items,
      disabled,
      selectable,
      selected,
      idField,
      displayField,
      detailField,
      disabledField,
      iconField,
      iconColorField
    } = toRefs(props);

    const fields = computed(() => ({
      idField: idField.value,
      displayField: displayField.value,
      detailField: detailField.value,
      disabledField: disabledField.value,
      iconField: iconField.value,
      iconColorField: iconColorField.value
    }));

    const list = useList({
      items,
      disabled,
      selectable,
      selected,
      fields,
      emit
    });

    const { displayItems } = list;

    return {
      instance: list,
      displayItems
    };
  }
};
</script>

<style>
@import "list";
</style>
