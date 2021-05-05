export class CancellationToken {
  static emptyUnbind = () => { };

  constructor() {
    this._isCancelled = false;
    this._listeners = [];
  }

  cancel() {
    if (!this._isCancelled) {
      this._isCancelled = true;
      this._listeners.forEach(listener => listener?.());
      this.destroy();
    }
  }

  get isCancellationRequested() {
    return this._isCancelled;
  }

  onCancellationRequested(listener) {
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
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this.listener.splice(index, 1);
    }
  }

  destroy() {
    this._listeners = [];
  }
}

export function createCancelledToken() {
  const token = new CancellationToken();
  token.cancel();
  return token;
}

export const CancelledToken = createCancelledToken();

export class CancellationTokenSource {
  constructor() {
    this._token = null;
  }

  get token() {
    if (!this._token) {
      this._token = new CancellationToken();
    }
    return this._token;
  }

  cancel() {
    if (!this._token) {
      this._token = CancelledToken;
    } else {
      this._token.cancel();
    }
  }

  destroy(cancel = false) {
    if (cancel) {
      this.cancel();
    }
    this._token?.destroy();
  }
}
