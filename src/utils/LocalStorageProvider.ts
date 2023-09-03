enum LocalStorageKey {
  Name = "name",
}

class LocalStorageProvider {
  constructor() {}

  public setItem(key: LocalStorageKey, value: string) {
    localStorage.setItem(key, value);
  }

  public removeItem(key: LocalStorageKey) {
    localStorage.removeItem(key);
  }

  public getItem(key: LocalStorageKey): string {
    const result = localStorage.getItem(key);
    if (!result) {
      throw Error(`${key} is not exists in localStorage`);
    }
    return result;
  }
}

const localStorageProvider = new LocalStorageProvider();

export { LocalStorageKey, localStorageProvider };
