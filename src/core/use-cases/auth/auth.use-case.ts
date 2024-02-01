import { InjectRepository } from "@nestjs/typeorm";
import { Input } from "./input";
import { Output } from "./output";
import { User } from "@database/postgres/entities/user.entity";
import { Repository } from "typeorm";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'

@Injectable()
export class Auth {
  constructor(
    @InjectRepository(User) private repository: Repository<User>
  ){}

  async execute({ email, password }: Input): Promise<Output>{
    const user = await this.repository.findOne({ where: { email } });

    if(!user){
      throw new NotFoundException("Usuário não existe!");
    }

    await this.validatePassword(user, password);

    const access_token = jwt.sign({ role: user.role }, process.env.JWT_ACCESS_TOKEN_SECRET as string, { subject: user.id });
    const refresh_token = jwt.sign({ role: user.role }, process.env.JWT_REFRESH_TOKEN_SECRET as string, { subject: user.id });

    return { access_token, refresh_token }
  }

  private async validatePassword(user: User, password: string): Promise<void>{
    if(!user.password){
      throw new BadRequestException("Usuário não possui senha");
    }

    const isValid = await compare(password, user.password);

    if(!isValid){
      throw new UnauthorizedException("Senha ou email incorreto");
    }
  } 
}