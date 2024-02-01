import { Topic } from "@database/postgres/entities/topic.entity";
import { Input } from "./input";
import { Injectable } from "@nestjs/common";
import { User } from "@database/postgres/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEnum } from "core/enum";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class CreateUser {
 constructor(@InjectRepository(User) private userRepository: Repository<User>){}

 async execute(input: Input): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { cpf: input.cpf } });

    if (existingUser) {
      return existingUser;
    }

    const user = await this.userRepository.save({
      ...input,
      password: input.password ? await hash(input.password, await genSalt(2)) : undefined,
      role: input.role ?? RoleEnum.USER
    })

    return user;
 }
}