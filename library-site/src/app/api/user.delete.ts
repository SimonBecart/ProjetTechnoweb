import axios from 'axios';

// Fonction pour supprimer un utilisateur
export const useDeleteUser = () => {
  const deleteUser = async (userId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3001/users/${userId}`); // Remplacez l'URL par l'URL de votre API
      // Vous pouvez gérer la réponse de suppression ici si nécessaire
      return response.data;
    } catch (error) {
      // Gérez les erreurs en cas d'échec de la suppression
      throw error;
    }
  };

  return deleteUser;
};
