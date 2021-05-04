import { ref, reactive } from "vue";

class SearchContoller {
  constructor(dataSource, options = null) {
    this.dataSource = dataSource;
    this.searchTimeout = options?.searchTimeout;
    this.minSearchLength = options?.minSearchLength;
    this.maxQueryLength = options?.maxQueryLength;
    this.maxItemCount = options?.maxItemCount;
    this.resultItems = reactive([]);
    this.loading = ref(false);
  }

  performSearch() { }

  destroy() { }
}

export default SearchContoller;
