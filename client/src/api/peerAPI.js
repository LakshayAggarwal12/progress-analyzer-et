import axiosInstance from './axiosInstance';

export const peerAPI = {
  getPeers: () => axiosInstance.get('/peers'),
  getChat: (peerId) => axiosInstance.get(`/peers/chat/${peerId}`),
  sendMessage: (peerId, text) => axiosInstance.post(`/peers/chat/${peerId}/message`, { text })
};
