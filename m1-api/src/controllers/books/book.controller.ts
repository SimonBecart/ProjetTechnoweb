import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  BookPresenter,
  PlainBookPresenter,
} from 'm1-api/src/controllers/books/book.presenter';
import { Book, BookId } from 'm1-api/src/entities';
import { BookUseCases } from 'm1-api/src/useCases';

@Controller('books')
export class BookController {
  constructor(private readonly bookUseCases: BookUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainBookPresenter[]> {
    const books = await this.bookUseCases.getAllPlain();

    return books.map(PlainBookPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: BookId): Promise<BookPresenter> {
    const book = await this.bookUseCases.getById(id);

    return BookPresenter.from(book);
  }

  @Post('/')
  public async add(@Body() input: Book): Promise<BookPresenter> {
    const book = await this.bookUseCases.add(input);

    return BookPresenter.from(book);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: BookId,
    @Body() input: Book,
  ): Promise<BookPresenter> {
    const book = await this.bookUseCases.updateById(id, input);

    return BookPresenter.from(book);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: BookId): Promise<void> {
    return this.bookUseCases.deleteById(id);
  }
}
