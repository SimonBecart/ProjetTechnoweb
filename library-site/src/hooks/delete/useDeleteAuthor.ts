import axios from 'axios';

export const useDeleteAuthor = async (id: string): Promise<void> => {
  await axios
    .delete(`${process.env.NEXT_PUBLIC_API_URL}/authors/${id}`)
    .catch((e) => console.log(e));
};
