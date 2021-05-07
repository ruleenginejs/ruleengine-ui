import { isDefined } from "@/utils/types";
import { watch, watchEffect, reactive } from "vue";
import ListItem from "./list-item";

class List {
  constructor({
    items,
    disabled,
    selected,
    focused,
    focusIndex,
    focusLoop,
    fields,
    emit
  }) {
    this.items = items;
    this.emit = emit;
    this.fields = fields;
    this.disabled = disabled;
    this.selected = selected;
    this.focused = focused;
    this.focusIndex = focusIndex;
    this.focusLoop = focusLoop;
    this.displayItems = reactive([]);
    this.onSelect = this.onSelect.bind(this);
    this.updateFocusItem = this.updateFocusItem.bind(this);

    this.initWatchers();
    this.updateSelection();
    this.updateFocusItem(this.focusIndex.value);
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

    watch(this.focusIndex, this.updateFocusItem);
  }

  isSelectedItem(listItem) {
    const id = listItem[this.fields.value.idField];
    const selectedId = this.selected.value?.[this.fields.value.idField];
    return isDefined(selectedId) && isDefined(id) && id === selectedId;
  }

  updateSelection() {
    this.displayItems.forEach(listItem => {
      listItem.selected = this.isSelectedItem(listItem);
    });
  }

  updateFocusItem(newValue = null, oldValue = null) {
    if (isDefined(oldValue) && this.displayItems[oldValue]) {
      this.displayItems[oldValue].focused = false;
    }

    if (!isDefined(newValue)) {
      this.emit("update:focused", null);
      return;
    }

    if (newValue < 0) {
      if (this.focusLoop.value) {
        newValue = this.displayItems.length - 1;
      } else {
        newValue = 0;
      }
    }
    if (newValue >= this.displayItems.length) {
      if (this.focusLoop.value) {
        newValue = 0;
      } else {
        newValue = this.displayItems.length - 1;
      }
    }

    const listItem = this.displayItems[newValue];
    if (!listItem) {
      this.emit("update:focused", null);
      return;
    }

    listItem.focused = true;
    this.emit("update:focused", listItem.data);
    this.emit("update:focusIndex", newValue);
  }

  onSelect(listItem, e) {
    this.emit("select", listItem.data, e);
    this.emit("update:selected", listItem.data);
  }
}

export default List;
