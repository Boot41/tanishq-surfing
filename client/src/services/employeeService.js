// client/src/services/employeeService.js
import apiClient from './apiClient';

export const employeeService = {
  getAll: async () => {
    const response = await apiClient.get('/employees/');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/employees/${id}/`);
    return response.data;
  },

  create: async (data) => {
    const response = await apiClient.post('/employees/', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await apiClient.put(`/employees/${id}/`, data);
    return response.data;
  },
};