import { Topic } from "@database/postgres/entities/topic.entity";
import { Input } from "./input";
import { Injectable } from "@nestjs/common";
import { User } from "@database/postgres/entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RoleEnum } from "core/enum";
import { genSalt, hash } from "bcrypt";

@Injectable()
export class CreateUserAdmin {
 constructor(@InjectRepository(User) private userRepository: Repository<User>){}

 private readonly admin_email: string = String(process.env.ADMIN_USER_EMAIL);
 private readonly admin_password = String(process.env.ADMIN_USER_PASSWORD);
 private readonly admin_cpf = String(process.env.ADMIN_USER_CPF);

 async execute(): Promise<void> {
    const user = await this.userRepository.findOneBy({ cpf: this.admin_cpf });

    if (user) {
      console.log(`User admin already createad ${this.admin_email}`)
      return 
    }

    await this.userRepository.save({
      email: this.admin_email,
      cpf: this.admin_cpf,
      password: await hash(this.admin_password, await genSalt(2)),
      role: RoleEnum.ADMIN
    })

    console.log(`User admin has been createad ${this.admin_email}:${this.admin_password}`)
 }
}