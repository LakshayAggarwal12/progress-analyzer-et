import axiosInstance from './axiosInstance';

export const roadmapAPI = {
  get: () => axiosInstance.get('/roadmap'),
  updateTopic: (topicId, completed) => axiosInstance.patch(`/roadmap/topic/${topicId}`, { completed }),
  regenerate: () => axiosInstance.post('/roadmap/regenerate')
};
