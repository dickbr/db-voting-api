import { Session } from '@database/postgres/entities/session.entity';
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseGuards,
  Param,
} from '@nestjs/common';
import { CreateSession } from 'core/use-cases/session/create-session/create-session.use-case';
import { ListSessionAdmin } from 'core/use-cases/session/list-session/list-session-admin.use-case';
import { ListSession } from 'core/use-cases/session/list-session/list-session.use-case';
import { ReportSession } from 'core/use-cases/session/report-session/report-session.use-case';
import { CreateSessionRequest } from 'dtos/session/create-session.request';
import { AdminMiddleware } from 'middlewares/auth/admin.middleware';
import { AuthMiddleware } from 'middlewares/auth/auth.middleware';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly createSession: CreateSession,
    private readonly listSession: ListSession,
    private readonly listSessionAdmin: ListSessionAdmin,
    private readonly reportSession: ReportSession,
  ) {}

  @Post()
  @UseGuards(AuthMiddleware, AdminMiddleware)
  create(@Body() body: CreateSessionRequest) {
    return this.createSession.execute(body);
  }

  @Get('admin')
  @UseGuards(AuthMiddleware, AdminMiddleware)
  listAdmin(
    @Query("category") category?: string): Promise<Session[]> {
    return this.listSessionAdmin.execute(category);
 }

  @Get()
  list(
    @Query("client_id") client_id: string,
    @Query("category") category?: string
  ): Promise<Session[]> {
    console.log(client_id)
    return this.listSession.execute(client_id, category);
 }

  @Get(':id')
  @UseGuards(AuthMiddleware, AdminMiddleware)
  report(@Param("id") id: string) {
    return this.reportSession.execute(id);
 }
}
