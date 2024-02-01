import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@database/postgres/entities/user.entity';
import { Topic } from '@database/postgres/entities/topic.entity';

@Injectable()
export class ListTopic {
 constructor(
 @InjectRepository(Topic) private topicRepository: Repository<Topic>,
 ){}

 async execute(session_id: string): Promise<Topic[]> {
    return await this.topicRepository.find({where: { session: { id: session_id }  }, relations: ['session']});
 }
}