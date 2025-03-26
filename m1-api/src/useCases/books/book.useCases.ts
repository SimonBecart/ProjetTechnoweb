import { Injectable } from '@nestjs/common';
import { Book, BookId } from 'm1-api/src/entities';
import { BookRepository } from 'm1-api/src/repositories';
import {
  BookUseCasesOutput,
  PlainBookUseCasesOutput,
} from 'm1-api/src/useCases/books/book.useCases.type';

@Injectable()
export class BookUseCases {
  constructor(private readonly bookRepository: BookRepository) {}

  /**
   * Get all plain books
   * @returns Array of plain books
   */
  public async getAllPlain(): Promise<PlainBookUseCasesOutput[]> {
    return this.bookRepository.getAllPlain();
  }

  /**
   * Get a book by its ID
   * @param id Book's ID
   * @returns Book if found
   * @throws 404: book with this ID was not found
   */
  public async getById(id: BookId): Promise<BookUseCasesOutput> {
    return this.bookRepository.getById(id);
  }

  /**
   * Add a new book
   * @param book Book to add
   * @returns Added book
   */
  public async add(book: Book): Promise<BookUseCasesOutput> {
    return this.bookRepository.add(book);
  }

  /**
   * Update a book by its ID
   * @param id Book's ID
   * @param input New book data
   * @returns Updated book
   */
  public async updateById(
    id: BookId,
    input: Book,
  ): Promise<BookUseCasesOutput> {
    return this.bookRepository.updateById(id, input);
  }

  /**
   * Delete a book by its ID
   * @param id Book's ID
   */
  public async deleteById(id: BookId): Promise<void> {
    return this.bookRepository.deleteById(id);
  }
}
