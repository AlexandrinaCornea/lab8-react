const storagePref = "lab8-fbi-cache:";
const memoryCache = new Map();

export function getCachedValue(key, ttl) {
  const storageKey = `${storagePref}${key}`;
  const memoryEntry = memoryCache.get(key);

  if (memoryEntry) {
    const isExpired = Date.now() - memoryEntry.timestamp > ttl;

    if (!isExpired) {
      return memoryEntry.value;
    }

    memoryCache.delete(key);
  }

  try {
    const rawValue = localStorage.getItem(storageKey);

    if (!rawValue) {
      return null;
    }

    const parsed = JSON.parse(rawValue);
    const isExpired = Date.now() - parsed.timestamp > ttl;

    if (isExpired) {
      localStorage.removeItem(storageKey);
      return null;
    }

    memoryCache.set(key, parsed);
    return parsed.value;
  } catch {
    return null;
  }
}

export function setCachedValue(key, value) {
  const storageKey = `${storagePref}${key}`;
  const cacheEntry = {
    value,
    timestamp: Date.now(),
  };

  memoryCache.set(key, cacheEntry);

  try {
    localStorage.setItem(storageKey, JSON.stringify(cacheEntry));
  } catch {
    // apare eroare, de aceea am decis sa pun ceva in comentarii
    //just say hi to FBI
  }
}
