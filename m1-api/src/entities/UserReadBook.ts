/* eslint-disable import/no-cycle */
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

export type UserReadBookId = string & { __brand: 'UserReadBook' };

@Entity('UserReadBooks')
export class UserReadBook extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UserReadBookId;

  @ManyToOne(() => User, (user) => user.userReadBooks, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Book, (book) => book.userReadBook, { onDelete: 'CASCADE' })
  book: Book;
}
