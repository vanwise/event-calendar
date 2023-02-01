const StorageService: StorageServiceType = {
  get(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : data;
  },
  set(key, newValue) {
    const data = JSON.stringify(newValue);
    localStorage.setItem(key, data);
  },
  remove(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};

interface StorageValues {
  'access-token': string;
}
type StorageKey = keyof StorageValues;
interface StorageServiceType {
  get<K extends StorageKey>(key: K): StorageValues[K] | null;
  set<K extends StorageKey>(key: K, newValue: StorageValues[K]): void;
  remove(key: StorageKey): void;
  clear(): void;
}

export default StorageService;
