export function mockLocalStorage() {
  Object.defineProperty(window, 'localStorage', {
    value: {
      _storage: {},
      clear() {
        this._storage = {};
      },
      setItem(key: string, value: string) {
        this._storage[key] = value;
      },
      getItem(key: string) {
        return this._storage[key] || null;
      },
      removeItem(key: string) {
        delete this._storage[key];
      },
    },
  });
}
