import axiosInstance from './axiosInstance';

export const progressAPI = {
  get: () => axiosInstance.get('/progress'),
  getInsight: () => axiosInstance.get('/progress/insight')
};
