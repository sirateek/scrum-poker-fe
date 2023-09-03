enum Env {
  LOCAL = "local",
  PROD = "prod",
}

interface AppConfig {
  VITE_ENV: Env;
  VITE_APP_TITLE: string;
  VITE_POKER_API_HOST: string;
  VITE_POKER_WS_HOST: string;
}

const defaultConfig: AppConfig = {
  VITE_ENV: Env.LOCAL,
  VITE_APP_TITLE: "Poker",
  VITE_POKER_API_HOST: "http://localhost:3001",
  VITE_POKER_WS_HOST: "ws://localhost:3001",
};

class ConfigProvider {
  private static _instance: ConfigProvider;
  private _config: AppConfig = defaultConfig;

  private constructor() {
    this._config = window.APP_CONFIG;
    if (typeof window.APP_CONFIG === "undefined") {
      this._config = this.loadConfigFromEnv();
    }
  }

  private loadConfigFromEnv(): AppConfig {
    const appConfig: AppConfig = {
      VITE_APP_TITLE:
        import.meta.env.VITE_APP_TITLE ?? defaultConfig.VITE_APP_TITLE,
      VITE_ENV: import.meta.env.VITE_ENV ?? defaultConfig.VITE_ENV,
      VITE_POKER_API_HOST:
        import.meta.env.VITE_POKER_API_HOST ??
        defaultConfig.VITE_POKER_API_HOST,
      VITE_POKER_WS_HOST:
        import.meta.env.VITE_POKER_WS_HOST ?? defaultConfig.VITE_POKER_WS_HOST,
    };

    return appConfig;
  }

  public get config(): AppConfig {
    return this._config;
  }

  public static get instance(): ConfigProvider {
    if (!this._instance) {
      this._instance = new ConfigProvider();
    }
    return this._instance;
  }
}

export { AppConfig, ConfigProvider };
