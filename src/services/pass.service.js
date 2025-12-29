import api from '../api/axios';

/**
 * Pass Service
 * Handles all pass-related API calls for students
 */

/**
 * Create a new gate pass
 * @param {Object} passData - Pass data
 * @param {string} passData.passType - OUT_OF_STATION, LOCAL, or TEA_COFFEE
 * @param {string} passData.reason - Reason for pass
 * @param {string} passData.fromDate - Start date (ISO string)
 * @param {string} passData.toDate - End date (ISO string)
 * @returns {Promise} Created pass object
 */
export const createPass = async (passData) => {
  return await api.post('/api/passes', passData);
};

/**
 * Get all passes for current student
 * @returns {Promise} Array of pass objects
 */
export const getMyPasses = async () => {
  return await api.get('/api/passes/my');
};

