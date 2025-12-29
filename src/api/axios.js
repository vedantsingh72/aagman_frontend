import axios from 'axios';

/**
 * Central Axios Instance
 * Configured with base URL and interceptors for token management
 */

// Create axios instance with base URL
// CRITICAL: Base URL must match backend
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * Automatically attaches JWT token to all requests
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, attach it to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles errors globally, especially 401 Unauthorized
 * Prevents app crash on network errors
 */
api.interceptors.response.use(
  (response) => {
    // Return response data directly for easier access
    // Ensure we always return a valid object
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle network errors (backend not available)
    if (!error.response) {
      console.warn('Network error - backend may be unavailable:', error.message);
      // Don't crash the app, return a user-friendly error
      return Promise.reject({
        message: 'Unable to connect to server. Please check your connection.',
        status: 0,
        data: null,
        isNetworkError: true
      });
    }

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      // Clear all auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      
      // Only redirect if we're not already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Extract error message safely
    let errorMessage = 'An error occurred';
    
    if (error.response?.data) {
      // Backend error response
      if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else if (error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.data.error) {
        errorMessage = error.response.data.error;
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    // Return error response with message (never return functions or undefined)
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status || 0,
      data: error.response?.data || null
    });
  }
);

export default api;

