import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthorUseCases } from '../../useCases';
import { AuthorPresenter, PlainAuthorPresenter } from './author.presenter';
import { Author, AuthorId } from '../../entities';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorUseCases: AuthorUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainAuthorPresenter[]> {
    const authors = await this.authorUseCases.getAllPlain();

    return authors.map(PlainAuthorPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: AuthorId): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.getById(id);

    return AuthorPresenter.from(author);
  }

  @Post('/')
  public async add(@Body() input: Author): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.add(input);

    return AuthorPresenter.from(author);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: AuthorId,
    @Body() input: Author,
  ): Promise<AuthorPresenter> {
    const author = await this.authorUseCases.updateById(id, input);

    return AuthorPresenter.from(author);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: AuthorId): Promise<void> {
    return this.authorUseCases.deleteById(id);
  }
}
