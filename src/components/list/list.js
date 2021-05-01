import { watchEffect, reactive } from "vue";
import ListItem from "./list-item";

class List {
  constructor({
    items,
    disabled,
    selectable,
    selected,
    fields,
    emit
  }) {
    this.items = items;
    this.emit = emit;
    this.disabled = disabled;
    this.selectable = selectable;
    this.selected = selected;
    this.fields = fields;
    this.displayItems = reactive([]);

    this.initWatchers();
  }

  initWatchers() {
    watchEffect(() => {
      this.displayItems.length = 0;
      this.displayItems.push(...this.items.value.map(
        (item, index) => new ListItem(index, item, this.fields)
      ));
    });
  }
}

export default List;
