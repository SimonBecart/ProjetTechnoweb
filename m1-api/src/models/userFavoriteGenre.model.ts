import { UserFavoriteGenreId } from '../entities';

export type UserFavoriteGenreModel = {
  id: UserFavoriteGenreId;
  user: string;
  genre: string;
};
