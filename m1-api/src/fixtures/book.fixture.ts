import { faker } from '@faker-js/faker';
import { Book, BookId } from '../entities';
// eslint-disable-next-line import/no-cycle
import { authorFixture } from './author.fixture';
// eslint-disable-next-line import/no-cycle
import { bookGenreFixture } from './bookGenre.fixture';

export const bookFixture = (): Book =>
  ({
    id: faker.string.uuid() as BookId,
    name: faker.string.sample(8),
    writtenOn: faker.date.past(),
    author: authorFixture(),
    bookGenres: [bookGenreFixture(), bookGenreFixture(), bookGenreFixture()],
  }) as Book;
