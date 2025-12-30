
declare module '*.gif';
declare module '*.jpg';
declare module '*.png';
declare module '*.svg';

interface Window {
  showSplash: () => void;
  hideSplash: () => void;
}

interface ImportMetaEnv {
  readonly MODE: 'development' | 'production';
  readonly VERSION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
