import { AppConfig } from "./utils/ConfigProvider";
import "vite/client";

export declare global {
  interface Window {
    APP_CONFIG: AppConfig;
  }
}
