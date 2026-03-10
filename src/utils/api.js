import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const recipeAPI = {
  getAll: (params = {}) => api.get("/recipes", { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  create: (formData) =>
    api.post("/recipes", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

export const categoryAPI = {
  getAll: () => api.get("/categories"),
};

export default api;
