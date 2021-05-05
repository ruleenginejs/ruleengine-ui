export class CancellationToken {
  static emptyUnbind = () => { };

  constructor() {
    debugger
    this._isCancelled = false;
    this._listeners = [];
  }

  cancel() {
    debugger
    if (!this._isCancelled) {
      this._isCancelled = true;
      this._listeners.forEach(listener => listener?.());
      this.destroy();
    }
  }

  get isCancellationRequested() {
    debugger
    return this._isCancelled;
  }

  onCancellationRequested(listener) {
    debugger
    if (this._isCancelled) {
      listener?.();
      return CancellationToken.emptyUnbind;
    }
    this._listeners.push(listener);
    return () => {
      this._removeListener(listener);
    }
  }

  _removeListener(listener) {
    debugger
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this.listener.splice(index, 1);
    }
  }

  destroy() {
    debugger
    this._listeners = [];
  }
}

export function createCancelledToken() {
  debugger
  const token = new CancellationToken();
  token.cancel();
  return token;
}

export const CancelledToken = createCancelledToken();

export class CancellationTokenSource {
  constructor() {
    debugger
    this._token = null;
  }

  get token() {
    debugger
    if (!this._token) {
      this._token = new CancellationToken();
    }
    return this._token;
  }

  cancel() {
    debugger
    if (!this._token) {
      this._token = CancelledToken;
    } else {
      this._token.cancel();
    }
  }

  destroy(cancel = false) {
    debugger
    if (cancel) {
      this.cancel();
    }
    this._token?.destroy();
  }
}
