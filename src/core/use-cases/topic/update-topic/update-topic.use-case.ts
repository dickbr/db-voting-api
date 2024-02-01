import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Input } from './input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '@database/postgres/entities/topic.entity';
import { Session } from '@database/postgres/entities/session.entity';

@Injectable()
export class UpdateTopic {
 constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    @InjectRepository(Session) private sessionRepository: Repository<Session>
  ){}

 async execute(input: Input): Promise<Topic> {
    const existingTopicByName = await this.topicRepository.findOne({ where: { title: input.title } });
    
    if (existingTopicByName && existingTopicByName.id !== input.id) {
      throw new ConflictException('Ja existe um Topico com esse nome');
    }

    const [topic, session] = await Promise.all([
      this.topicRepository.findOne({ where: { id: input.id } }),
      this.sessionRepository.findOne({ where: { id: input.session_id } }),
    ]);
    
    if (!topic) {
      throw new NotFoundException('O Topico nao existe');
    }

    if(!session){
      throw new NotFoundException('A sessão nao existe');
    }

    if(session.start_date && session.start_date <= new Date()){
      throw new BadRequestException("A sessão já foi iniciada");
    }
    
    return await this.topicRepository.save({
      ...topic,
      ...input,
      session
    })
 }
}