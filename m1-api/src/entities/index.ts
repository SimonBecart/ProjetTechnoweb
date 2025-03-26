import { Author } from 'm1-api/src/entities/Author';
import { Book } from 'm1-api/src/entities/Book';
import { BookGenre } from 'm1-api/src/entities/BookGenre';
import { Genre } from 'm1-api/src/entities/Genre';
import { User } from 'm1-api/src/entities/User';
import { UserReadBook } from 'm1-api/src/entities/UserReadBook';
import { UserFavoriteGenre } from './UserFavoriteGenre';

export * from './Author';
// eslint-disable-next-line import/no-cycle
export * from './Book';
export * from './BookGenre';
export * from './Genre';
export * from './User';
export * from './UserReadBook';
export * from './UserFavoriteGenre';

export const entities = [
  Author,
  Book,
  BookGenre,
  Genre,
  User,
  UserReadBook,
  UserFavoriteGenre,
];
