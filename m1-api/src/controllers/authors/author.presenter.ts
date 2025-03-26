import { AuthorId, Book } from 'm1-api/src/entities';
import { AuthorModel, PlainAuthorModel } from 'm1-api/src/models';

export class PlainAuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  writtenBooksNumber?: number;

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      writtenBooksNumber: data.writtenBooksNumber,
    });
  }
}

export class AuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl?: string;

  books?: Book[];

  private constructor(data: AuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: AuthorModel): AuthorPresenter {
    return new AuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
      books: data.books,
    });
  }
}
