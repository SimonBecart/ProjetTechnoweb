import { Injectable } from '@nestjs/common';
import { DataSource, In, Repository } from 'typeorm';
import { v4 } from 'uuid';
import {
  Book,
  Genre,
  User,
  UserFavoriteGenre,
  UserId,
  UserReadBook,
} from '../../entities';
import { PlainUserRepositoryOutput } from './user.repository.type';
import { adaptUserEntityToPlainUserModel } from './user.utils';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async getAllUsers(): Promise<PlainUserRepositoryOutput[]> {
    const users = await this.find({
      relations: {
        preferredBook: true,
        userReadBooks: { book: true },
        userFavoriteGenres: { genre: true },
      },
    });

    return users.map(adaptUserEntityToPlainUserModel);
  }

  public async getById(id: UserId): Promise<PlainUserRepositoryOutput> {
    const user = await this.findOne({
      relations: {
        preferredBook: true,
        userReadBooks: { book: true },
        userFavoriteGenres: { genre: true },
      },
      where: { id },
    });

    if (!user) {
      throw new Error(`User - '${id}' not found`);
    }

    return adaptUserEntityToPlainUserModel(user);
  }

  public async add(input: User): Promise<PlainUserRepositoryOutput> {
    return this.dataSource.transaction(async (manager) => {
      const [user] = await manager.save<User>(
        manager.create<User>(User, [
          {
            ...input,
            id: v4(),
          },
        ]),
      );

      return this.getById(user.id);
    });
  }

  public async updateById(
    id: UserId,
    input: User,
  ): Promise<PlainUserRepositoryOutput> {
    await this.dataSource.transaction(async (manager) => {
      if (input.userReadBooks) {
        await manager.delete<UserReadBook>(UserReadBook, { user: { id } });

        const newReadBooks = await manager.find<Book>(Book, {
          where: {
            id: In(input.userReadBooks),
          },
        });

        await manager.save<UserReadBook>(
          newReadBooks.map((book) =>
            manager.create<UserReadBook>(UserReadBook, {
              id: v4(),
              user: { id },
              book,
            }),
          ),
        );
      }

      if (input.userFavoriteGenres) {
        await manager.delete<UserFavoriteGenre>(UserFavoriteGenre, {
          user: { id },
        });

        const newFavoriteGenre = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.userFavoriteGenres),
          },
        });

        await manager.save<UserFavoriteGenre>(
          newFavoriteGenre.map((genre) =>
            manager.create<UserFavoriteGenre>(UserFavoriteGenre, {
              id: v4(),
              user: { id },
              genre,
            }),
          ),
        );
      }

      // soucis avec patch
      await manager.update<User>(User, id, {
        ...input,
        userReadBooks: undefined,
        userFavoriteGenres: undefined,
      });
    });

    return this.getById(id);
  }

  public async deleteById(id: UserId): Promise<void> {
    await this.delete({ id });
  }
}
