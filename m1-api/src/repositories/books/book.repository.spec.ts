import { DataSource } from 'typeorm';
import { BookRepository } from './book.repository';
import { bookFixture } from '../../fixtures';
import { adaptBookEntityToPlainBookModel } from './book.utils';

describe('BookRepository', () => {
  describe('getAllPlain', () => {
    it('should return all books', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new BookRepository(dataSource);

      const books = [bookFixture(), bookFixture(), bookFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(books);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { bookGenres: { genre: true }, author: true },
      });
      expect(result).toStrictEqual(books.map(adaptBookEntityToPlainBookModel));
    });
  });
});
