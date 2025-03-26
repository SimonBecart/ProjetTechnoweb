import { Injectable } from '@nestjs/common';
import { GenreRepository } from '../../repositories';
import { GenreModel } from '../../models';

@Injectable()
export class GenreUseCases {
  constructor(private readonly genreRepository: GenreRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<GenreModel[]> {
    return this.genreRepository.getAllPlain();
  }
}
