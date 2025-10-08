export function getZendeskHelpUrl() {
  return import.meta.env.VITE_ZENDESK_BASE_URL
    ? `${import.meta.env.VITE_ZENDESK_BASE_URL}`
    : '';
}
