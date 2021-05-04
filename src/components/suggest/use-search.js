import { watch, onBeforeUnmount } from "vue";
import SearchContoller from "./search-controller";

export default function useSuggest({
  dataSource,
  searchQuery,
  searchTimeout,
  minSearchLength,
  maxQueryLength,
  maxItemCount
}) {
  let controller = createSearchController();
  controller.performSearch(searchQuery.value);

  watch([
    dataSource,
    searchTimeout,
    minSearchLength,
    maxQueryLength,
    maxItemCount
  ], () => {
    controller.destroy();
    controller = createSearchController();
  });

  watch(searchQuery, () => {
    controller.performSearch(searchQuery.value);
  });

  onBeforeUnmount(() => {
    controller.destroy();
    controller = null;
  });

  function createSearchController() {
    return new SearchContoller(dataSource.value, {
      searchTimeout: searchTimeout.value,
      minSearchLength: minSearchLength.value,
      maxQueryLength: maxQueryLength.value,
      maxItemCount: maxItemCount.value
    })
  }

  return {
    loading: controller.loading,
    resultItems: controller.resultItems
  }
}
