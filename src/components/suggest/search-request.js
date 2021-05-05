import { CancellationTokenSource } from "@/utils/cancellation";

class SearchRequest {
  static nextId = 0;

  constructor(query, dataSource, completion = null) {
    this.id = ++SearchRequest.nextId;
    this.query = query;
    this.dataSource = dataSource;
    this.error = null;
    this.completed = false;
    this.completion = completion;
    this.cancellationSource = new CancellationTokenSource();
  }

  async execute() {
    try {
      this.completed = false;
      if (this.isCancelled) {
        return;
      }
      if (!this.dataSource) {
        return;
      }
      const result = await this.dataSource(this.query, this.id, this.cancellationSource.token);
      if (this.isCancelled) {
        return;
      }

      this.completed = true;
      this.completion?.(null, result);
    } catch (e) {
      if (this.isCancelled) {
        return;
      }

      this.error = e;
      this.completed = true;
      this.completion?.(e);
    } finally {
      this.cancellationSource.destroy();
    }
  }

  cancel() {
    this.cancellationSource.cancel();
  }

  get isCancelled() {
    return this.cancellationSource.token.isCancellationRequested;
  }

  destroy() {
    this.cancellationSource.destroy(!this.completed);
    this.dataSource = null;
    this.completion = null;
  }
}

export default SearchRequest;
