import axiosInstance from './axiosInstance';

export const logAPI = {
  add: (data) => axiosInstance.post('/logs', data),
  getAll: () => axiosInstance.get('/logs'),
  delete: (id) => axiosInstance.delete(`/logs/${id}`)
};
