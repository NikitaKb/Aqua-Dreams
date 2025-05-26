export const API_CONFIG = {
  BASE_URL: 'http://localhost:8000'
} as const;

// Helper function to get full API URL
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
}; 