import { DetailedBookModel } from './detailedBook.model';

export type DetailedAuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  books: DetailedBookModel[];
};
