import { PlainUserRepositoryOutput } from './user.repository.type';
import { User } from '../../entities';

export const adaptUserEntityToPlainUserModel = (
  user: User,
): PlainUserRepositoryOutput => ({
  ...user,
  preferredBook: user.preferredBook || null,
  booksRead:
    user.userReadBooks.length !== 0
      ? user.userReadBooks.map((book) => book.book)
      : null,
  favoriteGenres:
    user.userFavoriteGenres.length !== 0
      ? user.userFavoriteGenres.map((genre) => genre.genre.name)
      : null,
});
