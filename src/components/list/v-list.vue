<template>
  <div
    class="v-list"
    :class="{
      'v-list--disabled': disabled,
      'v-list--md': size === 'md',
      'v-list--sm': size === 'sm'
    }"
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
      @click="onSelect(item, $event)"
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
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Object,
      default: null
    },
    focused: {
      type: Object,
      default: null
    },
    focusIndex: {
      type: Number,
      default: null
    },
    focusLoop: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "md"
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
  emits: ["update:selected", "update:focused", "update:focusIndex", "select"],
  setup(props, { emit }) {
    const {
      items,
      disabled,
      selected,
      focused,
      focusIndex,
      focusLoop,
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
      selected,
      focused,
      focusIndex,
      focusLoop,
      fields,
      emit
    });

    const { displayItems, onSelect } = list;

    return {
      instance: list,
      displayItems,
      onSelect
    };
  }
};
</script>

<style>
@import "list";
</style>
