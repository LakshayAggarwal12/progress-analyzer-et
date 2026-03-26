import axiosInstance from './axiosInstance';

export const quizAPI = {
  generate: (data) => axiosInstance.post('/quiz/generate', data),
  submit: (data) => axiosInstance.post('/quiz/submit', data),
  getHistory: () => axiosInstance.get('/quiz/history'),
};