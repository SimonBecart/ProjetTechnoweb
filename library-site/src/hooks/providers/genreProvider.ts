import axios from 'axios';
import { useState } from 'react';
import { PlainGenreModel } from '@/models/genre.model';

type UseListGenresProvider = {
  genres: PlainGenreModel[];
  genreLoad: () => void;
};

export const useListGenres = (): UseListGenresProvider => {
  const [genres, setGenres] = useState<PlainGenreModel[]>([]);

  const fetchGenres = (): void => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/genres`)
      .then((data) => setGenres(data.data))
      .catch((err) => console.error(err));
  };

  return { genres, genreLoad: fetchGenres };
};

type GenreProviders = {
  useListGenres: () => UseListGenresProvider;
};

export const useGenresProviders = (): GenreProviders => ({
  useListGenres,
});
