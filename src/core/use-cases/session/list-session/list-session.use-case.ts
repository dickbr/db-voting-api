import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { MoreThan, Repository, FindOptionsWhere, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@database/postgres/entities/user.entity';
import { Client } from '@database/postgres/entities/client.entity';

@Injectable()
export class ListSession {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
  ){}

  async execute(string, category?: string): Promise<Session[]> {
    let where: FindOptionsWhere<Session> = {};

    if (category) {
      where = { ...where, category };
    }

    return await this.sessionRepository.find({ 
      where: {
        ...where,
        start_date: LessThan(new Date),
        end_date: MoreThan(new Date),
      } 
    });
  }
}