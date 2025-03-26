// Dans votre fichier detailedAuthorProvider.ts

import axios from 'axios';
import { useState } from 'react';
import { DetailedAuthorModel } from '@/models/detailedAuthor.model';

type UseDetailedAuthorProvider = {
  author: DetailedAuthorModel | null;
  load: (authorId: string) => void;
};

export const useDetailedAuthor = (): UseDetailedAuthorProvider => {
  const [author, setAuthor] = useState<DetailedAuthorModel | null>(null);

  const load = (authorId: string): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/authors/${authorId}`)
      .then((data) => setAuthor(data.data))
      .catch((err) => console.error(err));
  };
  return { author, load };
};

type DetailedAuthorProviders = {
  useDetailedAuthor: () => UseDetailedAuthorProvider;
};

export const useDetailedAuthorsProviders = (): DetailedAuthorProviders => ({
  useDetailedAuthor,
});
