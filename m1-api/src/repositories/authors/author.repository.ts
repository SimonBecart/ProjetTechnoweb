import { Injectable } from '@nestjs/common';
import { Author, AuthorId } from 'm1-api/src/entities';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { NotFoundError } from '../../common/errors';
import {
  AuthorRepositoryOutput,
  PlainAuthorRepositoryOutput,
} from './author.repository.type';
import {
  adaptAuthorEntityToAuthorModel,
  adaptAuthorEntityToPlainAuthorModel,
} from './author.utils';

@Injectable()
export class AuthorRepository extends Repository<Author> {
  constructor(public readonly dataSource: DataSource) {
    super(Author, dataSource.createEntityManager());
  }

  public async getAllPlain(): Promise<PlainAuthorRepositoryOutput[]> {
    const authors = await this.find({
      relations: { books: true },
    });

    return authors.map(adaptAuthorEntityToPlainAuthorModel);
  }

  public async getById(id: AuthorId): Promise<AuthorRepositoryOutput> {
    const author = await this.findOne({
      relations: { books: true },
      where: { id },
    });

    if (!author) {
      throw new NotFoundError(`Author - '${id}'`);
    }

    return adaptAuthorEntityToAuthorModel(author);
  }

  public async add(input: Author): Promise<AuthorRepositoryOutput> {
    return this.dataSource.transaction(async (manager) => {
      const [author] = await manager.save<Author>(
        manager.create<Author>(Author, [
          {
            ...input,
            id: v4(), // Generate a new UUID for the author
          },
        ]),
      );

      return this.getById(author.id);
    });
  }

  public async updateById(
    id: AuthorId,
    input: Author,
  ): Promise<AuthorRepositoryOutput> {
    await this.dataSource.transaction(async (manager) => {
      await manager.update<Author>(Author, id, {
        ...input,
      });
    });

    return this.getById(id);
  }

  public async deleteById(id: AuthorId): Promise<void> {
    await this.delete({ id });
  }
}
