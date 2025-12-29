import api from '../api/axios';

export const getPendingPasses = async () => {
  return await api.get('/api/academic/pending');
};

export const getStudentLeaves = async () => {
  return await api.get('/api/academic/student-leaves');
};

export const getDepartmentLeaves = async () => {
  return await api.get('/api/academic/department-leaves');
};

export const approvePass = async (passId) => {
  return await api.patch(`/api/academic/approve/${passId}`);
};

