import { watch, watchEffect, onUnmounted } from 'vue';
import SearchContoller from './search-controller';

export default function useSearch({
  dataSource,
  searchQuery,
  searchTimeout,
  minSearchLength,
  maxQueryLength,
  maxItemCount,
  clearOnInvisible,
  visible
}) {
  let controller = createSearchController();

  watch(
    [dataSource, searchTimeout, minSearchLength, maxQueryLength, maxItemCount],
    () => {
      controller.destroy();
      controller = createSearchController();
    }
  );

  watchEffect(() => {
    if (visible.value) {
      controller.performSearch(searchQuery.value, true);
    }
  });

  watch(visible, () => {
    if (!visible.value && clearOnInvisible.value) {
      controller.reset();
    }
  });

  onUnmounted(() => {
    controller.destroy();
    controller = null;
  });

  function createSearchController() {
    return new SearchContoller(dataSource.value, {
      searchTimeout: searchTimeout.value,
      minSearchLength: minSearchLength.value,
      maxQueryLength: maxQueryLength.value,
      maxItemCount: maxItemCount.value
    });
  }

  return {
    loading: controller.loading,
    error: controller.lastRequestError,
    resultItems: controller.resultItems
  };
}
