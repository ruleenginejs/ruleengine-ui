import { computed } from 'vue';

export default function useList({ listFocusItem, listFocusIndex, emit }) {
  const modelListFocusItem = computed({
    get: () => listFocusItem.value,
    set: val => emit('update:listFocusItem', val)
  });

  const modelListFocusIndex = computed({
    get: () => listFocusIndex.value,
    set: val => emit('update:listFocusIndex', val)
  });

  const onSelect = (item, e) => {
    emit('select', item, e);
  };

  return {
    modelListFocusItem,
    modelListFocusIndex,
    onSelect
  };
}
