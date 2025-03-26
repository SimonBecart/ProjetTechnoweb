import { PlainAuthorPresenter } from 'm1-api/src/controllers/authors/author.presenter';
import { GenrePresenter } from 'm1-api/src/controllers/genres/genre.presenter';
import { BookId } from 'm1-api/src/entities';
import { BookModel, PlainBookModel } from 'm1-api/src/models';

export class PlainBookPresenter {
  id: BookId;

  name: string;

  author: PlainAuthorPresenter;

  writtenOn: Date;

  cover?: string;

  genres: string[];

  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      author: PlainAuthorPresenter.from(data.author),
      writtenOn: data.writtenOn,
      cover: data.cover,
      genres: data.genres,
    });
  }
}

export class BookPresenter {
  id: string;

  name: string;

  author: PlainAuthorPresenter;

  writtenOn: Date;

  cover?: string;

  genres?: GenrePresenter[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      author: PlainAuthorPresenter.from(data.author),
      writtenOn: data.writtenOn,
      cover: data.cover,
      genres: data.genres.map(GenrePresenter.from),
    });
  }
}
