import axios from 'axios';

// Adresse de ton serveur Express backend
const API_URL = 'http://localhost:5000/api/habits';

// 1. Récupérer toutes les habitudes
export const getHabits = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 2. Créer une nouvelle habitude
export const createHabit = async (habitData) => {
  const response = await axios.post(API_URL, habitData);
  return response.data;
};

// 3. Marquer une habitude comme terminée
export const completeHabitApi = async (id) => {
  const response = await axios.put(`${API_URL}/${id}/toggle`);
  return response.data;
};