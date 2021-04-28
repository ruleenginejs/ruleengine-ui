<template>
  <div class="v-list"></div>
</template>

<script>
export default {
  name: "v-list",
  props: {
    items: {
      type: Array,
      default: () => []
    },
    tabIndex: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    focused: {
      type: Boolean,
      default: false
    },
    selectedItem: {
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
    }
  }
};
</script>
