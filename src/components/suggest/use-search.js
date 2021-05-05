import { watch, onBeforeUnmount } from "vue";
import SearchContoller from "./search-controller";

export default function useSearch({
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
    debugger;
    controller.destroy();
    controller = createSearchController();
  });

  watch(searchQuery, () => {
    controller.performSearch(searchQuery.value, true);
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
    error: controller.lastRequestError,
    resultItems: controller.resultItems
  }
}
