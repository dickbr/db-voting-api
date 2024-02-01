import { ConflictException, Injectable } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { Input } from './input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@database/postgres/entities/user.entity';

@Injectable()
export class CreateSession {
 constructor(@InjectRepository(Session) private sessionRepository: Repository<Session>, @InjectRepository(User) private userRepository: Repository<User>){}

 async execute(input: Input): Promise<Session> {

    const existingSession = await this.sessionRepository.findOne({ where: { title: input.title } });

    if (existingSession) {
        throw new ConflictException('A Sessao ja existe');
    }

    return await this.sessionRepository.save({
      ...input,
      session_time: input.session_time ?? 1
    })
 }
}