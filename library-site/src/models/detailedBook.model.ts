import { DetailedAuthorModel } from '@/models/detailedAuthor.model';
import { PlainGenreModel } from '@/models/genre.model';

export type DetailedBookModel = {
  id: string;
  name: string;
  genres: PlainGenreModel[]; // Un tableau de chaînes de caractères pour les genres
  writtenOn: string; // La date de publication sous forme de chaîne de caractères
  author: DetailedAuthorModel;
  cover: string;
};
