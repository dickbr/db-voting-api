import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { CreateUser } from 'core/use-cases/user/create-user/create-user.use-case';
import { CreateUserRequest } from 'dtos/user/create-user.request';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  create(@Body() body: CreateUserRequest) {
    return this.createUser.execute(body);
  }
}
