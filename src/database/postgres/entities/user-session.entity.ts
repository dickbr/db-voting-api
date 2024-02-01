import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Session } from "./session.entity";
import { User } from "./user.entity";

@Entity('user_sessions')
export class UserSession extends BaseEntity {
 @PrimaryGeneratedColumn('uuid')
 id?: string;

 @ManyToOne(() => Session, session => session.user_session)
 @JoinColumn({name: 'session_id'})
 session?: Session;

 @ManyToOne(() => User, user => user.user_session)
 @JoinColumn({name: 'user_id'})
 user?: User;

 @Column({type: 'timestamp'}) 
 start_at?: Date;

 @Column({type: 'timestamp'})
 end_at?: Date;
}