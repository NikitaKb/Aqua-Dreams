export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000',
  API_ENDPOINTS: {
    CATALOG: '/api/catalog',
    POOLS: '/api/pools',
    TERMS: '/api/terms',
    PROJECTS: '/api/project',
    CONTACT: '/api/contact'
  }
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`; 