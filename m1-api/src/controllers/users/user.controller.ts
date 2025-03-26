import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { User, UserId } from 'm1-api/src/entities/User';
import { UserUseCases } from 'm1-api/src/useCases/users/user.useCases';
import { PlainUserPresenter } from 'm1-api/src/controllers/users/user.presenter';

@Controller('users')
export class UserController {
  constructor(private readonly userUseCases: UserUseCases) {}

  @Get('/')
  public async getAll(): Promise<PlainUserPresenter[]> {
    const users = await this.userUseCases.getAllUsers();

    return users.map(PlainUserPresenter.from);
  }

  @Get('/:id')
  public async getById(@Param('id') id: UserId): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.getById(id);
    return PlainUserPresenter.from(user);
  }

  @Post('/')
  public async add(@Body() input: User): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.add(input);
    return PlainUserPresenter.from(user);
  }

  @Patch('/:id')
  public async updateById(
    @Param('id') id: UserId,
    @Body() input: User,
  ): Promise<PlainUserPresenter> {
    const user = await this.userUseCases.updateById(id, input);

    return PlainUserPresenter.from(user);
  }

  @Delete('/:id')
  public async deleteById(@Param('id') id: UserId): Promise<void> {
    return this.userUseCases.deleteById(id);
  }
}
