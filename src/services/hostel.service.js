import api from '../api/axios';

export const getPendingPasses = async () => {
  return await api.get('/api/hosteloffice/pending');
};

export const approvePass = async (passId) => {
  return await api.patch(`/api/hosteloffice/approve/${passId}`);
};

