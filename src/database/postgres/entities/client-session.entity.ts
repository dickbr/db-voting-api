import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { Client } from "./client.entity";

@Entity('client_sessions')
export class ClientSession extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id?: string;

 @ManyToOne(() => Session, session => session.user_session)
 @JoinColumn({name: 'session_id'})
 session?: Session;

 @ManyToOne(() => Client, client => client.client_session)
 @JoinColumn({name: 'client_id'})
 client?: Client;

 @Column({type: 'timestamp'}) 
 start_at?: Date;

 @Column({type: 'timestamp'})
 end_at?: Date;
}