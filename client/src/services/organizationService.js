// client/src/services/organizationService.js
import apiClient from './apiClient';

export const organizationService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/organizations/');
      return response.data;
    } catch (error) {
      console.error('Error fetching organizations:', error);
      throw error;
    }
  },
};