import axios from 'axios';
import { PlainAuthorModel } from '@/models';

export const usePushAuthor = async (
  Author: PlainAuthorModel,
): Promise<PlainAuthorModel> => {
  const { data } = await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/authors`, Author)
    .then((r) => r.data)
    .catch((e) => console.log(e));

  return data;
};
