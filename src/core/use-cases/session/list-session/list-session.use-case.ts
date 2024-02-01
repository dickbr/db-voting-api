import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@database/postgres/entities/session.entity';
import { MoreThan, Repository, FindOptionsWhere } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@database/postgres/entities/user.entity';

@Injectable()
export class ListSession {
  constructor(
    @InjectRepository(Session) private sessionRepository: Repository<Session>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ){}

  async execute(user_id: string, category?: string): Promise<Session[]> {
    if (!user_id) {
      throw new BadRequestException("User Id nao informado");
    }

    const user = await this.userRepository.findOne({ where: { id: user_id } });
    if (!user) {
      throw new NotFoundException("Usuario nao encontrado");
    }

    let where: FindOptionsWhere<Session> = {};

    if (user.role !== 'admin') {
      where.end_date = MoreThan(new Date());
    }

    if (category) {
      where = { ...where, category };
    }

    return await this.sessionRepository.find({ where });
  }
}