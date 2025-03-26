import { adaptUserEntityToPlainUserModel } from './user.utils';
import { User } from '../../entities';

describe('adaptUserEntityToPlainUserModel', () => {
  it('should adapt user entity to plain user model', () => {
    const userEntityMock: User = {
      age: 0,
      email: '',
      lastName: '',
      password: '',
      id: 'user-id' as never,
      firstName: 'John Doe',
      preferredBook: null,
      userReadBooks: [],
      userFavoriteGenres: [],
    };

    const plainUserModel = adaptUserEntityToPlainUserModel(userEntityMock);

    // Replace the assertions with the expected values based on your mock data
    expect(plainUserModel.id).toEqual(userEntityMock.id);
    expect(plainUserModel.firstName).toEqual(userEntityMock.firstName);
    expect(plainUserModel.preferredBook).toEqual(null); // Adjust based on your mock data
    // Add more expectations for other properties like booksRead and favoriteGenres
  });
});
