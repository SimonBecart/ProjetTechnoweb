/* eslint-disable import/no-cycle */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './Book';
import { UserReadBook } from './UserReadBook';
import { UserFavoriteGenre } from './UserFavoriteGenre';

export type UserId = string & { __brand: 'User' };

@Entity('Users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserId;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Book, (book) => book.usersPreferred, { onDelete: 'CASCADE' })
  preferredBook?: Book;

  @OneToMany(() => UserReadBook, (userReadBook) => userReadBook.user)
  userReadBooks?: UserReadBook[];

  @OneToMany(
    () => UserFavoriteGenre,
    (userFavoriteGenre) => userFavoriteGenre.user,
  )
  userFavoriteGenres?: UserFavoriteGenre[];
}
