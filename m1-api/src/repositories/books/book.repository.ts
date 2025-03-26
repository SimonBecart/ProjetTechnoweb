import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'm1-api/src/common/errors';
import { Book, BookGenre, BookId, Genre } from 'm1-api/src/entities';
import {
  BookRepositoryOutput,
  PlainBookRepositoryOutput,
} from 'm1-api/src/repositories/books/book.repository.type';
import {
  adaptBookEntityToBookModel,
  adaptBookEntityToPlainBookModel,
} from 'm1-api/src/repositories/books/book.utils';
import { DataSource, In, Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(public readonly dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookRepositoryOutput[]> {
    const books = await this.find({
      relations: { bookGenres: { genre: true }, author: true },
    });

    return books.map(adaptBookEntityToPlainBookModel);
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookRepositoryOutput> {
    const book = await this.findOne({
      relations: { bookGenres: { genre: true }, author: true },
      where: { id },
    });

    if (!book) {
      throw new NotFoundError(`Book - '${id}'`);
    }

    return adaptBookEntityToBookModel(book);
  }

  public async add(input: Book): Promise<BookRepositoryOutput> {
    return this.dataSource.transaction(async (manager) => {
      const [book] = await manager.save<Book>(
        manager.create<Book>(Book, [
          {
            ...input,
            id: v4(), // Generate a new UUID for the book
          },
        ]),
      );

      if (input.bookGenres) {
        // Remove existing book-genre associations
        await manager.delete<BookGenre>(BookGenre, {
          book: { id: book.id },
        });

        // Find the genres mentioned in the input
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.bookGenres),
          },
        });

        // Create new book-genre associations
        await manager.save<BookGenre>(
          newGenres.map((genre) =>
            manager.create<BookGenre>(BookGenre, {
              id: v4(), // Generate a new UUID for the association
              book: { id: book.id },
              genre,
            }),
          ),
        );
      }

      return this.getById(book.id);
    });
  }

  public async updateById(
    id: BookId,
    input: Book,
  ): Promise<BookRepositoryOutput> {
    await this.dataSource.transaction(async (manager) => {
      if (input.bookGenres) {
        // Remove existing book-genre associations
        await manager.delete<BookGenre>(BookGenre, { book: { id } });

        // Find the genres mentioned in the input
        const newGenres = await manager.find<Genre>(Genre, {
          where: {
            name: In(input.bookGenres),
          },
        });

        // Create new book-genre associations
        await manager.save<BookGenre>(
          newGenres.map((genre) =>
            manager.create<BookGenre>(BookGenre, {
              id: v4(), // Generate a new UUID for the association
              book: { id },
              genre,
            }),
          ),
        );
      }

      if (!(Object.keys(input).length === 1 && input.bookGenres)) {
        await manager.update<Book>(Book, id, {
          ...input,
          bookGenres: undefined,
        });
      }
    });

    return this.getById(id);
  }

  public async deleteById(id: BookId): Promise<void> {
    await this.delete({ id });
  }
}
