import { User } from '@database/postgres/entities/user.entity';
import { Injectable, NestMiddleware, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private repository: Repository<User>
  ){}

  async use(req: any, res: any, next: any) {
      const auth_header = req.headers['authorization'];
      const token = auth_header && auth_header.split(' ')[1];

      if (token == null) {
        throw new UnauthorizedException("Token não informado");
      }

      try {
        const { sub } = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET as string) as { sub: string };

        const user = await this.repository.findOneBy({ id: sub });

        if(!user){
          throw new NotFoundException("Usuário não encontrado");
        }

        req.user = user;
      } catch (error) {
        throw new UnauthorizedException("Token inválido");
      }

      next();
  }
}