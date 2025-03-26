import { Module } from '@nestjs/common';
import { AuthorRepository } from 'm1-api/src/repositories/authors/author.repository';
import { BookRepository } from 'm1-api/src/repositories/books/book.repository';
import { GenreRepository } from 'm1-api/src/repositories/genres/genre.repository';
import { UserRepository } from 'm1-api/src/repositories/users/user.repository';

const repositories = [
  AuthorRepository,
  BookRepository,
  GenreRepository,
  UserRepository,
];

@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
