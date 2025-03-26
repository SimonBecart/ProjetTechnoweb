import { Injectable } from '@nestjs/common';
import { AuthorRepository } from '../../repositories';
import { Author, AuthorId } from '../../entities';
import {
  AuthorUseCasesOutput,
  PlainAuthorUseCasesOutput,
} from './author.useCases.type';

@Injectable()
export class AuthorUseCases {
  constructor(private readonly authorRepository: AuthorRepository) {}

  public async getAllPlain(): Promise<PlainAuthorUseCasesOutput[]> {
    return this.authorRepository.getAllPlain();
  }

  public async getById(id: AuthorId): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.getById(id);
  }

  public async add(input: Author): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.add(input);
  }

  public async updateById(
    id: AuthorId,
    input: Author,
  ): Promise<AuthorUseCasesOutput> {
    return this.authorRepository.updateById(id, input);
  }

  public async deleteById(id: AuthorId): Promise<void> {
    return this.authorRepository.deleteById(id);
  }
}
