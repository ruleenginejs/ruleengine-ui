import { ref, reactive, markRaw } from "vue";
import debounce from "debounce";
import { isDefined } from "@/utils/types";
import SearchRequest from "./search-request";

class SearchContoller {
  constructor(dataSource, options = null) {
    debugger;
    this.dataSource = dataSource;
    this.searchTimeout = options?.searchTimeout;
    this.minSearchLength = options?.minSearchLength;
    this.maxQueryLength = options?.maxQueryLength;
    this.maxItemCount = options?.maxItemCount;
    this.resultItems = reactive([]);
    this.loading = ref(false);
    this.lastRequestError = ref(null);

    this._lastQuery = null;
    this._lastRequest = null;
    this._firstRequestCompleted = false;
    this._doSearch = this._doSearch.bind(this);
    this._requestCompleted = this._requestCompleted.bind(this);

    if (isDefined(this.searchTimeout)) {
      this._searchHandler = debounce(this._doSearch, this.searchTimeout);
    } else {
      this._searchHandler = this._doSearch;
    }
  }

  performSearch(query, throttle = false) {
    debugger;
    if (throttle) {
      this._searchHandler(query);
    } else {
      this._doSearch(query);
    }
  }

  _doSearch(query) {
    debugger;
    query = this._prepareQuery(query);
    if (!this._canSearch(query)) {
      return;
    }

    if (query === this._lastQuery) {
      return;
    }
    this._lastQuery = query;

    if (!this.dataSource) {
      return;
    }

    this._cancelLastRequest();

    this._startLoading();
    const request = this._createRequest(query);
    request.execute();
    this._lastRequest = request;
  }

  _canSearch(query) {
    debugger;
    return !isDefined(this.minSearchLength) || query.length < this.minSearchLength;
  }

  _prepareQuery(query) {
    debugger;
    query = query ?? "";

    if (isDefined(this.maxQueryLength) && query.length > this.maxQueryLength) {
      query = query.substring(0, this.maxQueryLength);
    }

    return query;
  }

  _startLoading() {
    debugger;
    if (!this._firstRequestCompleted) {
      this.loading.value = true;
    }
  }

  _stopLoading() {
    debugger;
    if (!this._firstRequestCompleted) {
      this._firstRequestCompleted = true;
      this.loading.value = false;
    }
  }

  _requestCompleted(error, result) {
    debugger;
    if (error) {
      this.lastRequestError.value = markRaw(error);
    } else if (Array.isArray(result)) {
      this.resultItems.length = 0;
      this.resultItems.push(...result);
    }
  }

  _createRequest(query) {
    debugger;
    return new SearchRequest(query, this.dataSource, this._requestCompleted);
  }

  _cancelLastRequest() {
    debugger;
    if (this._lastRequest) {
      this._lastRequest.destroy();
      this._lastRequest = null;
    }
  }

  destroy() {
    debugger;
    this._cancelLastRequest();
    this.dataSource = null;
  }
}

export default SearchContoller;
