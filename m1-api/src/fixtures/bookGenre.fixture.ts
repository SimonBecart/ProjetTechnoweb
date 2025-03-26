import { faker } from '@faker-js/faker';
import { AuthorId, BookGenre, BookGenreId, BookId } from '../entities';

export const bookGenreFixture = (): BookGenre =>
  ({
    id: faker.string.uuid() as BookGenreId,
    book: faker.string.uuid() as BookId,
    genre: faker.string.uuid() as AuthorId,
  }) as unknown as BookGenre;
