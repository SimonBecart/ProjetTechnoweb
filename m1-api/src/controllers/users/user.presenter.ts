import { UserId } from 'm1-api/src/entities/User';
import { UserModel } from 'm1-api/src/models';
import { Book } from '../../entities';

export class PlainUserPresenter {
  id: UserId;

  firstName: string;

  lastName: string;

  age: number;

  email: string;

  password: string;

  preferredBook?: Book | null;

  booksRead?: Book[] | null;

  favoriteGenres?: string[] | null;

  private constructor(data: PlainUserPresenter) {
    Object.assign(this, data);
  }

  public static from(data: UserModel): PlainUserPresenter {
    return new PlainUserPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      email: data.email,
      password: data.password,
      preferredBook: data.preferredBook,
      booksRead: data.booksRead,
      favoriteGenres: data.favoriteGenres,
    });
  }
}
