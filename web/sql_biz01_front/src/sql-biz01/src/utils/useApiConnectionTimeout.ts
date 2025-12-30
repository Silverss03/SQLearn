import * as _ from 'lodash-es';

export function useApiConnectionTimeout(): number {
  return _.parseInt(import.meta.env.VITE_API_CONNECTION_TIMEOUT || '10000');
}
