import { Injectable } from '@nestjs/common';
import { UserRepository } from 'm1-api/src/repositories/users/user.repository';
import { User, UserId } from 'm1-api/src/entities/User';
import { UserModel } from 'm1-api/src/models/user.model';

@Injectable()
export class UserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  public async getAllUsers(): Promise<UserModel[]> {
    return this.userRepository.getAllUsers();
  }

  public async getById(id: UserId): Promise<UserModel> {
    return this.userRepository.getById(id);
  }

  public async add(user: User): Promise<UserModel> {
    return this.userRepository.add(user);
  }

  public async updateById(id: UserId, user: User): Promise<UserModel> {
    return this.userRepository.updateById(id, user);
  }

  public async deleteById(id: UserId): Promise<void> {
    return this.userRepository.deleteById(id);
  }
}
