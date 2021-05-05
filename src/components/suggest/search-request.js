import { CancellationTokenSource } from "@/utils/cancellation";

let _requestId = 0;

export function makeRequest(query, dataSource, completion = null) {
  const requestId = ++_requestId;
  const cancellationSource = new CancellationTokenSource();

  async function execute() {
    try {
      if (isCancelled()) {
        return;
      }
      if (!dataSource) {
        return;
      }

      const result = await dataSource(query, requestId, cancellationSource.token);
      if (isCancelled()) {
        return;
      }

      completion?.(null, result);
    } catch (e) {
      if (isCancelled()) {
        return;
      }

      completion?.(e);
    } finally {
      cancellationSource.destroy();
    }
  }

  function cancel() {
    cancellationSource.cancel();
  }

  function isCancelled() {
    return cancellationSource.token.isCancellationRequested;
  }

  return {
    execute,
    cancel,
    isCancelled
  }
}
