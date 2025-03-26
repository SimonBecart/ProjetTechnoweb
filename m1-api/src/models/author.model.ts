import { AuthorId, Book } from 'm1-api/src/entities';

export type PlainAuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  writtenBooksNumber?: number;
};

export type AuthorModel = {
  id: AuthorId;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  books?: Book[];
};
