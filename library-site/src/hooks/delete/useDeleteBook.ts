import axios from 'axios';

export const useDeleteBook = async (id: string): Promise<void> => {
  await axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`)
    .catch((e) => console.log(e));
};
