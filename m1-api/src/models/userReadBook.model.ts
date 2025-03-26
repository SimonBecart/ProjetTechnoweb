import { UserReadBookId } from '../entities';

export type UserReadBookModel = {
  id: UserReadBookId;
  user: string;
  book: string;
};
