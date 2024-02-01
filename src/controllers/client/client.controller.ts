import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { CreateClient } from 'core/use-cases/client';
import { CreateClientRequest } from 'dtos/client/create-client.request';

@Controller('clients')
export class ClientController {
  constructor(private readonly createClient: CreateClient) {}

  @Post()
  create(@Body() body: CreateClientRequest) {
    return this.createClient.execute(body);
  }
}
