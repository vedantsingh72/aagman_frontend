import api from '../api/axios';

/**
 * Gate Service
 * Handles gate-related API calls
 */

/**
 * Scan QR code at gate
 * @param {string} qrCode - QR code string to scan
 * @returns {Promise} Pass validation result
 */
export const scanQRCode = async (qrCode) => {
  return await api.post('/api/gate/scan', { qrCode });
};

