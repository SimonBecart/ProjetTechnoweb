/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookGenre } from './BookGenre';
import { UserFavoriteGenre } from './UserFavoriteGenre';

export type GenreId = string & { __brand: 'Genre' };

@Entity('Genres')
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: GenreId;

  @Column()
  name: string;

  @OneToMany(() => BookGenre, (bookGenre) => bookGenre.genre)
  bookGenres: BookGenre[];

  @OneToMany(
    () => UserFavoriteGenre,
    (userFavoriteGenre) => userFavoriteGenre.genre,
  )
  userFavoriteGenres?: UserFavoriteGenre[];
}
