import { Input } from "./input";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Client } from "@database/postgres/entities/client.entity";

@Injectable()
export class CreateClient {
 constructor(@InjectRepository(Client) private repository: Repository<Client>){}

 async execute(input: Input): Promise<Client> {
    const client = await this.repository.findOne({ where: { cpf: input.cpf } });

    if (client) {
      return client;
    }

    return await this.repository.save(input)
 }
}