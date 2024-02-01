import { DataSource } from "typeorm";
import { Topic } from "./entities/topic.entity";
import { Vote } from "./entities/vote.entity";
import { User } from "./entities/user.entity";
import { Session } from "./entities/session.entity";
import { resolve } from "path";
import "dotenv/config";
import { ClientSession } from "./entities/client-session.entity";
import { Client } from "./entities/client.entity";

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE ,
  schema: process.env.DB_SCHEMA,
  entities: [Session, Topic, Vote, User, ClientSession, Client],
  synchronize: false,
  migrations: [resolve(__dirname, "migrations", "*{.ts,.js}")],
  uuidExtension: "uuid-ossp"
})