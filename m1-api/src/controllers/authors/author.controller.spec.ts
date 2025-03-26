import { Test, TestingModule } from '@nestjs/testing';
import { AuthorController } from './author.controller';
import { AuthorUseCases } from '../../useCases';
import { AuthorId } from '../../entities';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';

describe('AuthorController', () => {
  let controller: AuthorController;
  let authorUseCases: AuthorUseCases;

  beforeEach(async () => {
    const TestModule: TestingModule = await Test.createTestingModule({
      controllers: [AuthorController],
      providers: [AuthorUseCases],
    }).compile();

    controller = TestModule.get<AuthorController>(AuthorController);
    authorUseCases = TestModule.get<AuthorUseCases>(AuthorUseCases);
  });

  describe('getAll', () => {
    it('should return an array of authors', async () => {
      const authors: PlainAuthorPresenter[] = [
        { id: '1' as AuthorId, firstName: 'Author 1', lastName: '1' },
        { id: '2' as AuthorId, firstName: 'Author 2', lastName: '2' },
      ];
      jest
        .spyOn(authorUseCases, 'getAll' as keyof AuthorUseCases)
        .mockResolvedValue(authors);

      expect(await controller.getAll()).toBe(authors);
    });
  });

  describe('getById', () => {
    it('should return an author by id', async () => {
      const author: AuthorPresenter = {
        books: [],
        lastName: '1',
        photoUrl: '',
        id: '1' as AuthorId,
        firstName: 'Author',
      };
      jest.spyOn(authorUseCases, 'getById').mockResolvedValue(author);

      expect(await controller.getById('1' as AuthorId)).toBe(author);
    });
  });

  describe('deleteById', () => {
    it('should delete an author by id', async () => {
      const authorPresenter: AuthorPresenter = {
        books: [],
        lastName: '1',
        photoUrl: '',
        id: '1' as AuthorId,
        firstName: 'Author',
      };
      jest
        .spyOn(authorUseCases, 'deleteById')
        .mockResolvedValue(authorPresenter as never);

      expect(await controller.deleteById('1' as AuthorId)).toBe(
        authorPresenter,
      );
    });
  });
});
