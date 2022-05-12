import { isDefined } from '@/utils/types';
import { ref, computed } from 'vue';

class DropdownLayout {
  constructor(dropdownRef) {
    this.dropdownRef = dropdownRef;
    this.top = ref(0);
    this.left = ref(0);
    this.minWidth = ref(null);
    this.maxHeight = ref(null);
    this.maxWidth = ref(null);
    this.offsetX = ref(0);
    this.offsetY = ref(0);
    this.anchorEl = null;
    this.anchorConstraint = ref(false);

    this.styles = computed(() => ({
      top: `${this.top.value}px`,
      left: `${this.left.value}px`,
      maxWidth: isDefined(this.maxWidth.value)
        ? `${this.maxWidth.value}px`
        : null,
      maxHeight: isDefined(this.maxHeight.value)
        ? `${this.maxHeight.value}px`
        : null,
      minWidth: isDefined(this.minWidth.value)
        ? `${this.minWidth.value}px`
        : null
    }));
  }

  setMinWidth(value) {
    this.minWidth.value = value;
    return this;
  }

  setMaxWidth(value) {
    this.maxWidth.value = value;
    return this;
  }

  setMaxHeight(value) {
    this.maxHeight.value = value;
    return this;
  }

  setOffsetX(value) {
    this.offsetX.value = value;
    return this;
  }

  setOffsetY(value) {
    this.offsetY.value = value;
    return this;
  }

  setAnchor(anchorEl) {
    this.anchorEl = anchorEl;
    return this;
  }

  setAnchorConstraint(value) {
    this.anchorConstraint.value = value;
    return this;
  }

  update() {
    const anchorEl = this.anchorEl;
    const dropdownEl = this.dropdownRef.value;
    if (!anchorEl || !dropdownEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const dropdownRect = dropdownEl.getBoundingClientRect();
    const winHeight = window.innerHeight;

    if (this.anchorConstraint.value === true) {
      this.minWidth.value = anchorRect.width;
      this.maxWidth.value = anchorRect.width;
    } else if (this.anchorConstraint.value === 'minWidth') {
      this.minWidth.value = anchorRect.width;
    } else if (this.anchorConstraint.value === 'maxWidth') {
      this.maxWidth.value = anchorRect.width;
    }

    this.left.value = anchorRect.left + this.offsetX.value;
    this.top.value = anchorRect.top + anchorRect.height + this.offsetY.value;

    if (this.top.value + dropdownRect.height > winHeight) {
      this.top.value =
        anchorRect.top - dropdownRect.height - this.offsetY.value;
    }
  }
}

export default DropdownLayout;
