import api from '../api/axios';

/**
 * Academic Service
 * Handles academic office-related API calls
 */

/**
 * Get pending passes for academic approval
 * @returns {Promise} Array of pending pass objects
 */
export const getPendingPasses = async () => {
  return await api.get('/api/academic/pending');
};

/**
 * Get student leave statistics (all departments)
 * @returns {Promise} Array of student leave statistics
 */
export const getStudentLeaves = async () => {
  return await api.get('/api/academic/student-leaves');
};

/**
 * Get department-wise leave statistics
 * @returns {Promise} Object with department names as keys
 */
export const getDepartmentLeaves = async () => {
  return await api.get('/api/academic/department-leaves');
};

/**
 * Approve academic pass
 * @param {string} passId - Pass ID to approve
 * @returns {Promise} Updated pass object
 */
export const approvePass = async (passId) => {
  return await api.patch(`/api/academic/approve/${passId}`);
};

