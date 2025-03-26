import { Test, TestingModule } from '@nestjs/testing';
import { UserUseCases } from 'm1-api/src/useCases/users/user.useCases';
import { PlainUserPresenter } from 'm1-api/src/controllers/users/user.presenter';
import { UserController } from './user.controller';

// Mocking the UserUseCases
const mockUserUseCases = {
  getAllUsers: jest.fn(),
  getById: jest.fn(),
  add: jest.fn(),
  updateById: jest.fn(),
  deleteById: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const TestModule: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserUseCases,
          useValue: mockUserUseCases,
        },
      ],
    }).compile();

    controller = TestModule.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of PlainUserPresenter', async () => {
      const plainUserPresenterMock: PlainUserPresenter[] = []; // Mock your expected result here

      mockUserUseCases.getAllUsers.mockResolvedValueOnce(
        plainUserPresenterMock,
      );

      const result = await controller.getAll();

      expect(result).toEqual(plainUserPresenterMock);
    });
  });

  describe('getById', () => {
    it('should return a PlainUserPresenter by ID', async () => {
      const userId = 'your-user-id'; // Replace with an actual user ID
      const plainUserPresenterMock: PlainUserPresenter = {
        age: 0,
        email: '',
        firstName: '',
        id: undefined,
        lastName: '',
        password: '',
      }; // Mock your expected result here

      mockUserUseCases.getById.mockResolvedValueOnce(plainUserPresenterMock);

      const result = await controller.getById(userId as never);

      expect(result).toEqual(plainUserPresenterMock);
    });
  });

  describe('add', () => {
    it('should add a new user and return a PlainUserPresenter', async () => {
      const userToAdd = {}; // Replace with the user object you want to add
      const plainUserPresenterMock: PlainUserPresenter = {
        age: 0,
        email: '',
        firstName: '',
        id: undefined,
        lastName: '',
        password: '',
      }; // Mock your expected result here

      mockUserUseCases.add.mockResolvedValueOnce(plainUserPresenterMock);

      const result = await controller.add(userToAdd as never);

      expect(result).toEqual(plainUserPresenterMock);
    });
  });

  describe('updateById', () => {
    it('should update a user by ID and return a PlainUserPresenter', async () => {
      const userId = 'your-user-id'; // Replace with an actual user ID
      const updatedUser = {}; // Replace with the updated user object
      const updatedUserPresenterMock: PlainUserPresenter = {
        age: 0,
        email: '',
        firstName: '',
        id: undefined,
        lastName: '',
        password: '',
      }; // Mock your expected result here

      mockUserUseCases.updateById.mockResolvedValueOnce(
        updatedUserPresenterMock,
      );

      const result = await controller.updateById(
        userId as never,
        updatedUser as never,
      );

      expect(result).toEqual(updatedUserPresenterMock);
    });
  });

  describe('deleteById', () => {
    it('should delete a user by ID', async () => {
      const userId = 'your-user-id'; // Replace with an actual user ID

      await controller.deleteById(userId as never);

      // Assuming the deleteById method returns void, nothing to check here
      expect(mockUserUseCases.deleteById).toHaveBeenCalledWith(userId);
    });
  });
});
