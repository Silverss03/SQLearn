/// <reference types="@sql/configs/src/typescript/index.d.ts" />

interface ImportMetaEnv {
  readonly VITE_AUTHORITY_PATH: string;
  readonly VITE_POST_REDIRECT_URL: string;
  readonly VITE_REMOTE_APP_KERNEL: string;
  readonly VITE_REMOTE_APP_MP_BIZ01: string;

  readonly VITE_API_CONNECTION_TIMEOUT: string;


  readonly VITE_WIJMO_LICENSE_KEY: string;

  readonly VITE_GTM_ID: string;

  readonly VITE_ENV_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
