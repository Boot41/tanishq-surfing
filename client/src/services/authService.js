import apiClient from "./apiClient";

export const authService = {
  // Register new user
  register: async (data) => {
    const response = await apiClient.post("/auth/register/", data);
    return response.data;
  },

  // Login user
  // client/src/services/authService.js
  login: async (data) => {
    const response = await apiClient.post("/auth/login/", data);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem("user");
  },
};
