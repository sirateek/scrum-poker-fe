enum SessionStorageKey {
  Name = "name",
}

class SessionStorageProvider {
  constructor() {}

  public setItem(key: SessionStorageKey, value: string) {
    sessionStorage.setItem(key, value);
  }

  public removeItem(key: SessionStorageKey) {
    sessionStorage.removeItem(key);
  }

  public getItem(key: SessionStorageKey): string {
    const result = sessionStorage.getItem(key);
    if (!result) {
      throw Error(`${key} is not exists in sessionStorage`);
    }
    return result;
  }
}

const sessionStorageProvider = new SessionStorageProvider();

export { SessionStorageKey, sessionStorageProvider };
