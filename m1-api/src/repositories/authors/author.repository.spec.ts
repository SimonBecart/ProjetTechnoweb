import { DataSource } from 'typeorm';
import { adaptAuthorEntityToPlainAuthorModel } from './author.utils';
import { AuthorRepository } from './author.repository';
import { authorFixture } from '../../fixtures';

describe('AuthorRepository', () => {
  describe('getAllPlain', () => {
    it('should return all authors', async () => {
      const dataSource = {
        createEntityManager: jest.fn(),
      } as unknown as DataSource;
      const repository = new AuthorRepository(dataSource);

      const authors = [authorFixture(), authorFixture(), authorFixture()];

      const findSpy = jest.spyOn(repository, 'find').mockResolvedValue(authors);

      const result = await repository.getAllPlain();

      expect(findSpy).toHaveBeenCalledTimes(1);
      expect(findSpy).toHaveBeenCalledWith({
        relations: { books: true },
      });
      expect(result).toStrictEqual(
        authors.map(adaptAuthorEntityToPlainAuthorModel),
      );
    });
  });
});
