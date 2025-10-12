import { GTMCustomData } from '../types/GTMCustomData';

declare global {
  interface Window {
    dataLayer: Record<string, string | number | null>[];
  }
}


export function sendGTMCustomData(data: GTMCustomData) {
  window.dataLayer.push(data);
}
