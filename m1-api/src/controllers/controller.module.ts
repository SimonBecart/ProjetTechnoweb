import { Module } from '@nestjs/common';
import { AuthorController } from 'm1-api/src/controllers/authors/author.controller';
import { BookController } from 'm1-api/src/controllers/books/book.controller';
import { GenreController } from 'm1-api/src/controllers/genres/genre.controller';
import { UserController } from 'm1-api/src/controllers/users/user.controller';
import { RepositoryModule } from 'm1-api/src/repositories/repository.module';
import { UseCasesModule } from 'm1-api/src/useCases/useCases.module';

@Module({
  imports: [UseCasesModule, RepositoryModule],
  controllers: [
    AuthorController,
    BookController,
    GenreController,
    UserController,
  ],
})
export class ControllerModule {}
