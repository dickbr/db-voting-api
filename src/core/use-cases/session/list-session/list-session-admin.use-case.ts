import { Injectable } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { MoreThan, Repository, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListSessionAdmin {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
  ){}

  async execute(string, category?: string): Promise<Session[]> {
    let where: FindOptionsWhere<Session> = {};

    where.end_date = MoreThan(new Date());

    if (category) {
      where = { ...where, category };
    }

    return await this.sessionRepository.find({ where });
  }
}