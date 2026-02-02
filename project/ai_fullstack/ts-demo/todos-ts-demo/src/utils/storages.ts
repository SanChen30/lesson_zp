export function getStorage<T>(key: string, defaultValue: T): T {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
}

export function setStorage<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
}