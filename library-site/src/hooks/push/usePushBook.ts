import axios from 'axios';
import { BookModel } from '@/models';

export const usePushBook = async (Book: BookModel): Promise<BookModel> => {
  const { data } = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/books`, Book)
    .then((r) => r.data)
    .catch((e) => console.log(e));

  return data;
};
