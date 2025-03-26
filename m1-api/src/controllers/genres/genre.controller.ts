import { Controller, Get } from '@nestjs/common';
import { GenreUseCases } from '../../useCases';
import { GenrePresenter } from './genre.presenter';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreUseCases: GenreUseCases) {}

  @Get('/')
  public async getAll(): Promise<GenrePresenter[]> {
    const genres = await this.genreUseCases.getAllPlain();

    return genres.map(GenrePresenter.from);
  }
}
