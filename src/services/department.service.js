import api from '../api/axios';

/**
 * Department Service
 * Handles department-related API calls
 */

/**
 * Get pending outstation passes
 * @returns {Promise} Array of pending pass objects
 */
export const getPendingPasses = async () => {
  return await api.get('/api/department/pending');
};

/**
 * Get student leave statistics for department
 * @returns {Promise} Array of student leave statistics
 */
export const getStudentLeaves = async () => {
  return await api.get('/api/department/student-leaves');
};

/**
 * Approve outstation pass
 * @param {string} passId - Pass ID to approve
 * @returns {Promise} Updated pass object
 */
export const approvePass = async (passId) => {
  return await api.patch(`/api/department/approve/${passId}`);
};

