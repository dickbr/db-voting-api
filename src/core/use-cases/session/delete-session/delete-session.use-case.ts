import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { Input } from './input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DeleteSession {
 constructor(@InjectRepository(Session) private sessionRepository: Repository<Session>){}

 async execute(input: Input): Promise<void> {
    const session = await this.sessionRepository.findOne({ where: { id: input.id } });
    
    if (!session) {
      throw new NotFoundException('A Sessao nao existe');
    }

    if (session.start_date && session.start_date <= new Date()) {
      throw new BadRequestException('A Sessao ja inicou');
    }

    await this.sessionRepository.remove(session); 
 }
}