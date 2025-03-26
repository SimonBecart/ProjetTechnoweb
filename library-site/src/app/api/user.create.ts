import axios from 'axios';
import { PlainUserModel } from '@/models/user.model';

// Fonction pour créer un nouvel utilisateur
export const createUser = async (userData: PlainUserModel) => {
  try {
    const response = await axios.post('http://localhost:3001/users', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
