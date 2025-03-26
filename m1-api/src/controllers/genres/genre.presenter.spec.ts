import { GenrePresenter } from './genre.presenter';

describe('GenrePresenter', () => {
  it('should create a GenrePresenter instance with provided data', () => {
    const genreModelMock = {
      id: 'your-genre-id',
      name: 'Action',
    };

    const genrePresenter = GenrePresenter.from(genreModelMock as never);

    expect(genrePresenter).toBeDefined();
    expect(genrePresenter).toBeInstanceOf(GenrePresenter);
    expect(genrePresenter.id).toEqual(genreModelMock.id);
    expect(genrePresenter.name).toEqual(genreModelMock.name);
  });
});
