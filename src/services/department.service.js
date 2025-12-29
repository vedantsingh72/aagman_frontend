import api from '../api/axios';

export const getPendingPasses = async () => {
  return await api.get('/api/department/pending');
};

export const getStudentLeaves = async () => {
  return await api.get('/api/department/student-leaves');
};

export const approvePass = async (passId) => {
  return await api.patch(`/api/department/approve/${passId}`);
};

