import * as _ from 'lodash-es';

export function useApiConnectionTimeout(): number {
  // Reason for 10s timeout: https://typetalk.com/topics/339814/posts/114830996
  return _.parseInt(import.meta.env.VITE_API_CONNECTION_TIMEOUT || '10000');
}
