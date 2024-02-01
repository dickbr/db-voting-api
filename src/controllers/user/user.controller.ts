import {
  Controller,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from 'core/use-cases/user/create-user/create-user.use-case';
import { CreateUserRequest } from 'dtos/user/create-user.request';
import { AdminMiddleware } from 'middlewares/auth/admin.middleware';
import { AuthMiddleware } from 'middlewares/auth/auth.middleware';

@Controller('users')
export class UserController {
  constructor(private readonly createUser: CreateUser) {}

  @Post()
  @UseGuards(AuthMiddleware, AdminMiddleware)
  create(@Body() body: CreateUserRequest) {
    return this.createUser.execute(body);
  }
}
