import { Injectable } from '@nestjs/common';
import { Genre } from 'm1-api/src/entities';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class GenreRepository extends Repository<Genre> {
  constructor(public readonly dataSource: DataSource) {
    super(Genre, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<Genre[]> {
    return this.find();
  }
}
