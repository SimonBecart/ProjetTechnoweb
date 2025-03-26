import { Module } from '@nestjs/common';
import { RepositoryModule } from 'm1-api/src/repositories/repository.module';
import { AuthorUseCases } from 'm1-api/src/useCases/authors/author.useCases';
import { BookUseCases } from 'm1-api/src/useCases/books/book.useCases';
import { GenreUseCases } from 'm1-api/src/useCases/genres/genre.useCases';
import { UserUseCases } from 'm1-api/src/useCases/users/user.useCases';

const useCases = [AuthorUseCases, BookUseCases, GenreUseCases, UserUseCases];

@Module({
  imports: [RepositoryModule],
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
