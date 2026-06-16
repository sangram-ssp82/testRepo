/**
 * API Configuration for OctoFit Tracker Frontend
 * 
 * Dynamically determines API base URL based on environment:
 * - Codespaces: https://$CODESPACE_NAME-8000.app.github.dev
 * - Localhost: http://localhost:8000
 */

export const getApiBaseUrl = () => {
  // Check if running in Codespaces
  const codespaceName = process.env.VITE_CODESPACE_NAME;
  
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }
  
  // Default to localhost
  return 'http://localhost:8000';
};

export const API_BASE_URL = getApiBaseUrl();

// API Endpoints
export const API_ENDPOINTS = {
  root: `${API_BASE_URL}`,
  health: `${API_BASE_URL}/health`,
  users: `${API_BASE_URL}/api/users`,
  teams: `${API_BASE_URL}/api/teams`,
  activities: `${API_BASE_URL}/api/activities`,
  workouts: `${API_BASE_URL}/api/workouts`,
  leaderboard: `${API_BASE_URL}/api/leaderboard`,
};

// Fetch with error handling
export const fetchFromApi = async (endpoint, options = {}) => {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    throw error;
  }
};

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  fetchFromApi,
  getApiBaseUrl,
};
