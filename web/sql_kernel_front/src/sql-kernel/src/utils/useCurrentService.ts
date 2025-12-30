import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

/**
 * Helper function to get current service name from URL
 * @returns various states
 *          serviceName...Service Name
 *          serviceRoot...Service Root Path
 */
export function useCurrentService() {
  const { pathname } = useLocation();
  const { t } = useTranslation('common', { keyPrefix: 'COMMON.SERVICE_NAME' });
  const [serviceName, setServiceName] = useState<string | null>(null);
  const [serviceRoot, setServiceRoot] = useState<string>('/');

  useEffect(() => {
    setServiceName(null);
    setServiceRoot('/');
  }, [pathname, t]);

  return {
    serviceName,
    serviceRoot,
  };
}
