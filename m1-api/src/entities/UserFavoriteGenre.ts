import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Genre } from './Genre';
// eslint-disable-next-line import/no-cycle
import { User } from './User';

export type UserFavoriteGenreId = string & { __brand: 'UserFavoriteGenre' };

@Entity('UserFavoriteGenres')
export class UserFavoriteGenre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserFavoriteGenreId;

  @ManyToOne(() => User, (user) => user.userFavoriteGenres, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Genre, (genre) => genre.userFavoriteGenres, {
    onDelete: 'CASCADE',
  })
  genre: Genre;
}
