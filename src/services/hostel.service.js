import api from '../api/axios';

/**
 * Hostel Office Service
 * Handles hostel office-related API calls
 */

/**
 * Get pending local passes
 * @returns {Promise} Array of pending pass objects
 */
export const getPendingPasses = async () => {
  return await api.get('/api/hosteloffice/pending');
};

/**
 * Approve local pass
 * @param {string} passId - Pass ID to approve
 * @returns {Promise} Updated pass object
 */
export const approvePass = async (passId) => {
  return await api.patch(`/api/hosteloffice/approve/${passId}`);
};

