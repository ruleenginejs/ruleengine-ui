import { CancellationTokenSource } from "@/utils/cancellation";

class SearchRequest {
  static nextId = 0;

  constructor(query, dataSource, completion = null) {
    debugger
    this.id = ++Request.nextId;
    this.query = query;
    this.dataSource = dataSource;
    this.error = null;
    this.completed = false;
    this.completion = completion;
    this.cancellationSource = new CancellationTokenSource();
  }

  async execute() {
    try {
      debugger
      this.completed = false;
      if (this.isCancelled) {
        return;
      }
      const result = await this.dataSource(this.query, this.id, this.cancellationSource.token);
      debugger
      if (this.isCancelled) {
        return;
      }
      debugger
      this.completed = true;
      this.completion?.(null, result);
    } catch (e) {
      debugger
      if (this.isCancelled) {
        return;
      }

      this.error = e;
      this.completed = true;
      this.completion?.(e);
    }
  }

  cancel() {
    debugger
    this.cancellationSource.cancel();
  }

  get isCancelled() {
    debugger
    return this.cancellationSource.token.isCancellationRequested;
  }

  destroy() {
    debugger;
    this.cancellationSource.destroy(true);
    this.dataSource = null;
    this.completion = null;
  }
}

export default SearchRequest;
