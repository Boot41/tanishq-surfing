// client/src/services/assignmentService.js
import apiClient from './apiClient';

export const assignmentService = {
  getAll: async () => {
    const response = await apiClient.get('/assignments/');
    return response.data;
  },
  
  create: async (data) => {
    const response = await apiClient.post('/employee-assignments/create/', data);
    return response.data;
  },
  
  update: async (id, data) => {
    const response = await apiClient.put(`/assignments/${id}/`, data);
    return response.data;
  },
};