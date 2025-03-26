import axios from 'axios';

// Fonction pour supprimer un utilisateur
export const useDeleteUser = () => {
  const deleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/users/${userId}`,
      ); 
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return deleteUser;
};
