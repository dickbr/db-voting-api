import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Vote } from '@database/postgres/entities/vote.entity';
import { CreateVoteRequest } from 'dtos';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '@database/postgres/entities/topic.entity';
import { Session } from '@database/postgres/entities/session.entity';
import { Input } from './input';

@Injectable()
export class CreateVote {
 constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>, 
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
 ) {}

  async execute(input: Input): Promise<Vote> {
    const session = await this.sessionRepository.findOne({ where: { id: input.session_id } });

    if (!session || session.end_date && session.end_date <= new Date()) {
      throw new ConflictException('A Sessao ja finalizou');
    }

    const topic = await this.topicRepository.findOne({ where: { id: input.topic_id } });
    
    if (!topic) {
      throw new NotFoundException('O Topico nao existe');
    }
    
    const existingVote = await this.votesRepository.findOne({ where: { client_id: input.client_id, topic_id: input.topic_id } });

    if (existingVote) {
      throw new ConflictException('O usuário já votou neste tópico');
    }
  
    const vote = this.votesRepository.create({
      client_id: input.client_id,
      topic_id: input.topic_id,
      choice: input.choice,
    });
    
    await this.votesRepository.save(vote);
    
    return vote;
  }
}