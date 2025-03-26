import { UserId } from 'm1-api/src/entities/User';
import { Book } from '../entities';

export type UserModel = {
  id: UserId;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  preferredBook: Book;
  booksRead: Book[];
  favoriteGenres: string[];
};
