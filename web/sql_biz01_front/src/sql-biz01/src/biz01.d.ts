/// <reference types="@sql/configs/src/typescript/index.d.ts" />

interface ImportMetaEnv {
  readonly VITE_BIZ01_BACKEND_BASE_URL: string;

  readonly VITE_API_CONNECTION_TIMEOUT: string;

  readonly VITE_ENV_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
