import {BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Topic } from "./topic.entity";
import { ClientSession } from "./client-session.entity";

@Entity('sessions')
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column() 
  title!: string;

  @Column() 
  description!: string;

  @Column({type: 'timestamp'})
  start_date!: Date;

  @Column({type: 'timestamp'})
  end_date!: Date

  @Column()
  category!: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => Topic, topic => topic.session)
  @JoinColumn({referencedColumnName: 'session_id'})
  topics?: Topic[];

  @OneToMany(() => ClientSession, clientSession => clientSession.session)
  @JoinColumn({referencedColumnName: 'session_id'})
  user_session?: ClientSession[];

  @Column({type: 'bigint'})
  session_time!: number

}