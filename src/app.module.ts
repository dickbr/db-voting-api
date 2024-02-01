import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteController } from 'controllers/vote';
import { TopicController } from 'controllers/topic/topic.controller';
import { Topic } from '@database/postgres/entities/topic.entity';
import { Vote } from '@database/postgres/entities/vote.entity';
import "dotenv/config"
import { Session } from '@database/postgres/entities/session.entity';
import { User } from '@database/postgres/entities/user.entity';
import { SessionController } from 'controllers/session/session.controller';
import { CreateSession } from 'core/use-cases/session/create-session/create-session.use-case';
import { UserController } from 'controllers/user/user.controller';
import { CreateUser } from 'core/use-cases/user/create-user/create-user.use-case';
import { UserSession } from '@database/postgres/entities/user-session.entity';
import { UpdateSession } from 'core/use-cases/session/update-session/update-session.use-case';
import { UpdateTopic } from 'core/use-cases/topic/update-topic/update-topic.use-case';
import { DeleteSession } from 'core/use-cases/session/delete-session/delete-session.use-case';
import { DeleteTopic } from 'core/use-cases/topic/delete-topic/delete-topic.use-case';
import { CreateVoteRequest } from 'dtos';
import { CreateVote } from 'core/use-cases/vote/create-vote/create-vote.use-case';
import { CreateTopic } from 'core/use-cases/topic/create-topic/create-topic.use-case';
import { ListSession } from 'core/use-cases/session/list-session/list-session.use-case';
import { ListTopic } from 'core/use-cases/topic/list-topic/list-topic.use-case';
import { AuthMiddleware } from 'middlewares/auth/auth.middleware';
import { AdminMiddleware } from 'middlewares/auth/admin.middleware';
import { AuthController } from 'controllers/auth/auth.controller';
import { Auth } from 'core/use-cases/auth/auth.use-case';
import { ReportSession } from 'core/use-cases/session/report-session/report-session.use-case';


@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || ''),
      username: process.env.DB_USERNAME ,
      password: process.env.DB_PASSWORD ,
      database: process.env.DB_DATABASE ,
      schema: process.env.DB_SCHEMA,
      entities: [Topic, Vote, Session, User, UserSession],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Topic, Vote, Session, User, UserSession]),],
  controllers: [VoteController, TopicController, SessionController, UserController, VoteController, AuthController],
  providers:  [
    CreateSession, 
    CreateUser, 
    CreateVote, 
    CreateTopic, 
    UpdateSession, 
    UpdateTopic, 
    DeleteSession, 
    DeleteTopic, 
    ListSession, 
    ListTopic,
    ReportSession,
    Auth
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, AdminMiddleware)
      .forRoutes(
        { path: 'sessions', method: RequestMethod.POST }, 
        { path: 'sessions/:id', method: RequestMethod.GET }, 
        { path: 'topics', method: RequestMethod.POST }, 
        { path: 'topics/:id', method: RequestMethod.PUT }, 
      );
  }
}
