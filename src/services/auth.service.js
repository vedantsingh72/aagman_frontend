import api from '../api/axios';

/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

/**
 * Login user
 * @param {Object} credentials - Login credentials
 * @param {string} credentials.role - User role
 * @param {string} credentials.identifier - Roll number, department ID, etc.
 * @param {string} credentials.password - User password
 * @returns {Promise} Login response with token and user data
 */
export const login = async (credentials) => {
  return await api.post('/api/auth/login', credentials);
};

/**
 * Register new user (student)
 * @param {Object} userData - User registration data
 * @returns {Promise} Registration response
 */
export const register = async (userData) => {
  return await api.post('/api/users/register', userData);
};

/**
 * Register new student
 * @param {Object} userData - Student registration data
 * @returns {Promise} Registration response
 */
export const registerStudent = async (userData) => {
  return await api.post('/api/users/register', userData);
};

/**
 * Register new department
 * @param {Object} departmentData - Department registration data
 * @returns {Promise} Registration response
 */
export const registerDepartment = async (departmentData) => {
  return await api.post('/api/department/register', departmentData);
};

/**
 * Register new academic
 * @param {Object} academicData - Academic registration data
 * @returns {Promise} Registration response
 */
export const registerAcademic = async (academicData) => {
  return await api.post('/api/academic/register', academicData);
};

/**
 * Register new hostel office
 * @param {Object} hostelOfficeData - Hostel office registration data
 * @returns {Promise} Registration response
 */
export const registerHostelOffice = async (hostelOfficeData) => {
  return await api.post('/api/hosteloffice/register', hostelOfficeData);
};

/**
 * Register new gate
 * @param {Object} gateData - Gate registration data
 * @returns {Promise} Registration response
 */
export const registerGate = async (gateData) => {
  return await api.post('/api/gate/register', gateData);
};

/**
 * Get current user profile (works for all roles)
 * @returns {Promise} User profile data
 */
export const getProfile = async () => {
  return await api.get('/api/auth/me');
};

/**
 * Verify OTP for email verification
 * @param {Object} data - { email, otp }
 * @returns {Promise} Verification response
 */
export const verifyOTP = async (data) => {
  return await api.post('/api/auth/verify-otp', data);
};

/**
 * Resend OTP
 * @param {Object} data - { email }
 * @returns {Promise} Resend response
 */
export const resendOTP = async (data) => {
  return await api.post('/api/auth/resend-otp', data);
};

/**
 * Forgot Password - Send OTP
 * @param {Object} data - { email }
 * @returns {Promise} Forgot password response
 */
export const forgotPassword = async (data) => {
  return await api.post('/api/auth/forgot-password', data);
};

/**
 * Reset Password using OTP
 * @param {Object} data - { email, otp, newPassword }
 * @returns {Promise} Reset password response
 */
export const resetPassword = async (data) => {
  return await api.post('/api/auth/reset-password', data);
};

