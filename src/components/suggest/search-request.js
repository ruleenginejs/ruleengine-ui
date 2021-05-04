class SearchRequest {
  static nextId = 0;

  constructor(query, dataSource, resultItemsRef) {
    this.id = ++Request.nextId;
    this.query = query;
    this.dataSource = dataSource;
    this.resultItemsRef = resultItemsRef;
    this.error = null;
    this.completed = false;
  }

  execute() {

  }

  cancel() {

  }

  isCancelled() {

  }

  destroy() {

  }
}

export default SearchRequest;
