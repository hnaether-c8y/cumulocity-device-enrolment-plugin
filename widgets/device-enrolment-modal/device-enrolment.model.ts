export const PRODUCT_EXPERIENCE_SENSOR_PHONE = {
  EVENTS: {
    CONNECT_SMARTPHONE: 'connectSmartphone'
  },
  COMPONENTS: { SENSOR_PHONE_MODAL: 'sensor-phone-modal' },
  ACTIONS: {
    ESCAPE: 'escape',
    OPEN_DASHBOARD: 'openDashboard',
    RETRY: 'retry'
  },
  RESULTS: { FAILED: 'failed', REGISTER_PHONE_STARTED: 'registerPhoneStarted', SUCCESS: 'success' }
} as const;
