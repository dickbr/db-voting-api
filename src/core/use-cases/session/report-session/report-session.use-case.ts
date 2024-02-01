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
          SELECT 
            *
          FROM 
            (
              select 
                t1.id as session_id,
                t1.topic_id as topic_id,
                t1.session_title,
                t1.topic_title,
                case when t1.total_yes is not null then t1.total_yes else 0 end as total_yes,
                case when t2.total_no is not null then t2.total_no else 0 end as total_no
              from 
                (
                  select 
                    s.id,
                    t.id as topic_id,
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
                    t.id,
                    s.title,
                    t.title,
                    v.choice
                ) t1
              LEFT OUTER JOIN
                (
                  select 
                    s.id,
                    t.id as topic_id,
                    count(1) as total_no
                  from 
                    db.sessions s 
                  join 
                    db.topics t on t.session_id = s.id 
                  join 
                    db.votes v on v.topic_id = t.id
                  where 
                    s.id = '${session_id}'
                  and 
                    v.choice is false
                  group by 
                    s.id,
                    t.id,
                    s.title,
                    t.title,
                    v.choice
                ) t2 on t2.id = t1.id and t2.topic_id = t1.topic_id
            ) r
          order by r.total_yes desc 
        `);
 }
}