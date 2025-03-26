import { Test, TestingModule } from '@nestjs/testing';
import { BookUseCases } from 'm1-api/src/useCases';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'm1-api/src/controllers/books/book.presenter';
import { BookController } from './book.controller';
import { BookId } from '../../entities';

// Mocking the BookUseCases
const mockBookUseCases = {
  getAllPlain: jest.fn(),
  getById: jest.fn(),
  add: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe('BookController', () => {
  let controller: BookController;

  beforeEach(async () => {
    const TestModule: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookUseCases,
          useValue: mockBookUseCases,
        },
      ],
    }).compile();

    controller = TestModule.get<BookController>(BookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of PlainBookPresenter', async () => {
      const plainBookPresenterMock: PlainBookPresenter[] = []; // Mock your expected result here

      mockBookUseCases.getAllPlain.mockResolvedValueOnce(
        plainBookPresenterMock,
      );

      const result = await controller.getAll();

      expect(result).toEqual(plainBookPresenterMock);
    });
  });

  describe('getById', () => {
    it('should return a BookPresenter by ID', async () => {
      const bookId = 'your-book-id'; // Replace with an actual book ID
      const bookPresenterMock: BookPresenter = {
        author: undefined,
        cover: '',
        genres: [],
        id: '',
        name: '',
        writtenOn: undefined,
      }; // Mock your expected result here

      mockBookUseCases.getById.mockResolvedValueOnce(bookPresenterMock);

      const result = await controller.getById(bookId as BookId);

      expect(result).toEqual(bookPresenterMock);
    });
  });

  describe('add', () => {
    it('should add a new book and return a BookPresenter', async () => {
      const bookToAdd = {}; // Replace with the book object you want to add
      const bookPresenterMock: BookPresenter = {
        author: undefined,
        cover: '',
        genres: [],
        id: '',
        name: '',
        writtenOn: undefined,
      }; // Mock your expected result here

      mockBookUseCases.add.mockResolvedValueOnce(bookPresenterMock);

      const result = await controller.add(bookToAdd as never);

      expect(result).toEqual(bookPresenterMock);
    });
  });

  describe('updateById', () => {
    it('should update a book by ID and return a BookPresenter', async () => {
      const bookId = 'your-book-id'; // Replace with an actual book ID
      const updatedBook = {}; // Replace with the updated book object
      const updatedBookPresenterMock: BookPresenter = {
        author: undefined,
        cover: '',
        genres: [],
        id: '',
        name: '',
        writtenOn: undefined,
      }; // Mock your expected result here

      mockBookUseCases.updateById.mockResolvedValueOnce(
        updatedBookPresenterMock,
      );

      const result = await controller.updateById(
        bookId as BookId,
        updatedBook as never,
      );

      expect(result).toEqual(updatedBookPresenterMock);
    });
  });

  describe('deleteById', () => {
    it('should delete a book by ID and return a BookPresenter', async () => {
      const bookId = 'your-book-id'; // Replace with an actual book ID
      const deletedBookPresenterMock: BookPresenter = {
        author: undefined,
        cover: '',
        genres: [],
        id: '',
        name: '',
        writtenOn: undefined,
      }; // Mock your expected result here

      mockBookUseCases.deleteById.mockResolvedValueOnce(
        deletedBookPresenterMock,
      );

      const result = await controller.deleteById(bookId as BookId);

      expect(result).toEqual(deletedBookPresenterMock);
    });
  });
});
