import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Récupérer toutes les tâches
  getAllTasks: async () => {
    const response = await api.get('/tasks/');
    return response.data;
  },

  // Créer une nouvelle tâche
  createTask: async (taskData) => {
    const response = await api.post('/tasks/', taskData);
    return response.data;
  },

  // Mettre à jour une tâche
  updateTask: async (id, taskData) => {
    const response = await api.patch(`/tasks/${id}/`, taskData);
    return response.data;
  },

  // Supprimer une tâche
  deleteTask: async (id) => {
    await api.delete(`/tasks/${id}/`);
  },

  // Basculer l'état de complétion
  toggleComplete: async (id) => {
    const response = await api.post(`/tasks/${id}/toggle_complete/`);
    return response.data;
  },
};

export default api;