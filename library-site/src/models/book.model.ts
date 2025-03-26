import { PlainAuthorModel } from '@/models/author.model';

export type PlainBookModel = {
  id: string;
  name: string;
  writtenOn: string;
  cover: string;
  genres: string[];
  author?: PlainAuthorModel;
};

export type BookModel = {
  id: string;
  name: string;
  writtenOn: string;
  cover: string;
  bookGenres: string[];
  author?: string;
};
