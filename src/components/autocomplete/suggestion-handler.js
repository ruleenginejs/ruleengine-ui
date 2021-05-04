import { ref, reactive, watch } from "vue";

class SuggestionHandler {
  constructor(
    searchQuery,
    dataSource,
    searchTimeout,
    minSearchLength,
    maxItemCount
  ) {
    this.searchQuery = searchQuery;
    this.dataSource = dataSource;
    this.searchTimeout = searchTimeout;
    this.minSearchLength = minSearchLength;
    this.maxItemCount = maxItemCount;
    this.loading = ref(false);
    this.dropdownVisible = ref(false);
    this.resultItems = reactive([]);
    this.onValueChanged = this.onValueChanged.bind(this);
    watch(this.searchQuery, this.onValueChanged);
  }

  onValueChanged(newValue, oldValue) {

  }

  destroy() {

  }
}

export default SuggestionHandler;
