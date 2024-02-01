import { Topic } from "@database/postgres/entities/topic.entity";
import { Input } from "./input";
import { BadRequestException, ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Session } from "@database/postgres/entities/session.entity";

@Injectable()
export class CreateTopic {
 constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>, 
    @InjectRepository(Session) private sessionRepository: Repository<Session>
  ){}

 async execute(input: Input): Promise<Topic> {
    
    const session = await this.sessionRepository.findOne({ where: { id: input.session_id } });
    if(!session){
      throw new NotFoundException("A Sessao Nao existe");
    }

    if (session.start_date && session.start_date <= new Date()) {
      throw new BadRequestException('A Sessao ja iniciou');
    }

    const existingTopic = await this.topicRepository.findOne({ where: { title: input.title}})    
    
    if (existingTopic) {
      throw new ConflictException("O Topico ja existe");
    }

    return await this.topicRepository.save({ ...input, session })
 }
}