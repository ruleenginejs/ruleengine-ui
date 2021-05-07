import { isDefined } from "@/utils/types";
import { watch, watchEffect, reactive } from "vue";
import ListItem from "./list-item";

class List {
  constructor({
    items,
    disabled,
    selected,
    fields,
    emit
  }) {
    this.items = items;
    this.emit = emit;
    this.disabled = disabled;
    this.selected = selected;
    this.fields = fields;
    this.displayItems = reactive([]);
    this.onSelect = this.onSelect.bind(this);

    this.initWatchers();
    this.updateSelection();
  }

  initWatchers() {
    watchEffect(() => {
      this.displayItems.length = 0;
      this.displayItems.push(...this.items.value.map(
        (item, index) => new ListItem(index, item, this.fields)
      ));
    });

    watch(this.selected, () => {
      this.updateSelection();
    });
  }

  isSelectedItem(item) {
    const id = item[this.fields.value.idField];
    const selectedId = this.selected.value?.[this.fields.value.idField];
    return isDefined(selectedId) && isDefined(id) && id === selectedId;
  }

  updateSelection() {
    this.displayItems.forEach(item => {
      item.selected = this.isSelectedItem(item);
    });
  }

  onSelect(item, e) {
    this.emit("select", item.data, e);
    this.emit("update:selected", item.data);
  }
}

export default List;
