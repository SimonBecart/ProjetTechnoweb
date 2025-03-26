import { GenreId } from 'm1-api/src/entities';
import { GenreModel } from 'm1-api/src/models';

export class GenrePresenter {
  id: GenreId;

  name: string;

  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}
