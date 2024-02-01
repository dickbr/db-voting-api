import { Injectable, NotFoundException } from '@nestjs/common';
import { Input } from './input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from '@database/postgres/entities/topic.entity';

@Injectable()
export class DeleteTopic {
 constructor(@InjectRepository(Topic) private topicRepository: Repository<Topic>){}

 async execute(input: Input): Promise<void> {
    const existingTopic = await this.topicRepository.findOne({ where: { id: input.id } });
    
    if (!existingTopic) {
      throw new NotFoundException('O Topico nao existe');
    }

    await this.topicRepository.remove(existingTopic); 
 }
}