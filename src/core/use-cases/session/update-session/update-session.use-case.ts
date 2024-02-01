import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { Input } from './input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UpdateSession {
 constructor(@InjectRepository(Session) private sessionRepository: Repository<Session>){}

 async execute(input: Input): Promise<void> {
    const existingSessionByName = await this.sessionRepository.findOne({ where: { title: input.title } });
    if (existingSessionByName && existingSessionByName.id !== input.id) {
      throw new ConflictException('Ja existe uma Sessao com esse nome');
    }

    const session = await this.sessionRepository.findOne({ where: { id: input.id } });
    
    if (!session) {
      throw new NotFoundException('A Sessao nao existe');
    }

    if (session.start_date && session.start_date <= new Date()) {
      throw new ConflictException('A Sessao ja inicou');
    }

    const updatedSession = new Session();
    Object.assign(updatedSession, input);

    await this.sessionRepository.save(updatedSession); 
 }
}