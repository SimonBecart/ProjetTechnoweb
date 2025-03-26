import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreUseCases } from '../../useCases';
import { GenrePresenter } from './genre.presenter';

// Mocking the GenreUseCases
const mockGenreUseCases = {
  getAllPlain: jest.fn(),
};

describe('GenreController', () => {
  let controller: GenreController;

  beforeEach(async () => {
    const TestModule: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
      providers: [
        {
          provide: GenreUseCases,
          useValue: mockGenreUseCases,
        },
      ],
    }).compile();

    controller = TestModule.get<GenreController>(GenreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of GenrePresenter', async () => {
      const genrePresenterMock: GenrePresenter[] = []; // Mock your expected result here

      mockGenreUseCases.getAllPlain.mockResolvedValueOnce(genrePresenterMock);

      const result = await controller.getAll();

      expect(result).toEqual(genrePresenterMock);
    });
  });
});
