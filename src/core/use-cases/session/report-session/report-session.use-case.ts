import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@database/postgres/entities/user.entity';
import { Output } from './output';

@Injectable()
export class ReportSession {
 constructor(
  @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ){}

 async execute(session_id: string): Promise<Output | undefined> {
    return await 
        this.sessionRepository.query(`
          select 
            *
          from 
            (
              select 
                s.id,
                s.title as session_title,
                t.title as topic_title,
                v.choice,
                count(1) as total_yes
              from 
                db.sessions s 
              join 
                db.topics t on t.session_id = s.id 
              join 
                db.votes v on v.topic_id = t.id
              where 
                s.id = '${session_id}'
              and 
                v.choice is true
              group by 
                s.id,
                s.title,
                t.title,
                v.choice
            ) t1
          cross join 
            (
              select 
                count(1) as total_no
              from 
                db.sessions s 
              join 
                db.topics t on t.session_id = s.id 
              join 
                db.votes v on v.topic_id = t.id
              where 
                s.id = '6f0276f6-2b29-4a2f-bfe5-65a1b1542f58'
              and 
                v.choice is false
              group by 
                s.id,
                s.title,
                t.title,
                v.choice
            ) t2
        `);
 }
}