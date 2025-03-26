import { Author } from 'm1-api/src/entities';
import {
  AuthorRepositoryOutput,
  PlainAuthorRepositoryOutput,
} from 'm1-api/src/repositories/authors/author.repository.type';

export const adaptAuthorEntityToPlainAuthorModel = (
  author: Author,
): PlainAuthorRepositoryOutput => ({
  ...author,
  writtenBooksNumber: author.books.length,
});

export const adaptAuthorEntityToAuthorModel = (
  author: Author,
): AuthorRepositoryOutput => ({
  ...author,
  books: author.books,
});
