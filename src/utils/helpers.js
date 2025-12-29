/**
 * Helper Utility Functions
 * Reusable functions for formatting and data manipulation
 */

import { PASS_TYPE_LABELS } from './constants';

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get status badge color class
 * @param {string} status - Approval status
 * @returns {string} Tailwind CSS classes
 */
export const getStatusColor = (status) => {
  switch (status) {
    case 'APPROVED':
      return 'bg-green-100 text-green-800';
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800';
    case 'REJECTED':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

/**
 * Get pass type label
 * @param {string} type - Pass type
 * @returns {string} Human-readable label
 */
export const getPassTypeLabel = (type) => {
  return PASS_TYPE_LABELS[type] || type;
};

/**
 * Check if user has required role
 * @param {string} userRole - Current user role
 * @param {string[]} requiredRoles - Array of allowed roles
 * @returns {boolean} True if user has required role
 */
export const hasRole = (userRole, requiredRoles) => {
  return requiredRoles.includes(userRole);
};

