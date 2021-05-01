import { computed } from "vue";

class ListItem {
  constructor(index, proxyData, fields) {
    this.data = proxyData;
    this.fields = fields;
    this.selected = false;
    this.focused = false;
    this.index = index;

    this.id = computed(() => this.data[this.fields.value.idField] ?? index);
    this.text = computed(() => this.data[this.fields.value.displayField]);
    this.detail = computed(() => this.data[this.fields.value.detailField]);
    this.disabled = computed(() => !!this.data[this.fields.value.disabledField]);
    this.icon = computed(() => this.data[this.fields.value.iconField]);
    this.iconColor = computed(() => this.data[this.fields.value.iconColorField]);
  }
}

export default ListItem;
