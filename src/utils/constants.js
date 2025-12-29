/**
 * Application Constants
 * Centralized constants for roles, pass types, and status values
 */

// User roles in the system
export const ROLES = {
  USER: 'user',
  DEPARTMENT: 'department',
  ACADEMIC: 'academic',
  HOSTELOFFICE: 'hosteloffice',
  GATE: 'gate',
};

// Departments - Fixed enum (must match backend)
export const DEPARTMENTS = [
  'CSE',
  'Chemical',
  'Petroleum',
  'Electronics',
  'Mathematics',
  'Mechanical',
];

// Pass types
export const PASS_TYPES = {
  OUT_OF_STATION: 'OUT_OF_STATION',
  LOCAL: 'LOCAL',
  TEA_COFFEE: 'TEA_COFFEE',
};

// Approval status
export const APPROVAL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// Pass status
export const PASS_STATUS = {
  PENDING_DEPARTMENT: 'PENDING_DEPARTMENT',
  PENDING_ACADEMIC: 'PENDING_ACADEMIC',
  PENDING_HOSTEL: 'PENDING_HOSTEL',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

// Human-readable role labels
export const ROLE_LABELS = {
  user: 'Student',
  department: 'Department',
  academic: 'Academic Office',
  hosteloffice: 'Hostel Office',
  gate: 'Gate',
};

// Human-readable pass type labels
export const PASS_TYPE_LABELS = {
  OUT_OF_STATION: 'Out of Station',
  LOCAL: 'Local',
  TEA_COFFEE: 'Tea/Coffee',
};

