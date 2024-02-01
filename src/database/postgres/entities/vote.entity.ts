import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Topic } from "./topic.entity";
import { Client } from "./client.entity";

@Entity('votes')
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({type: 'uuid'})
  client_id!: string;

  @Column({type: 'uuid'})
  topic_id!: string;

  @Column({type:'boolean'}) 
  choice!: Boolean;
  
  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Topic, topic => topic.votes)
  @JoinColumn({name: 'topic_id'})
  topic?: Topic;
  
  @ManyToOne(() => Client, client => client.votes)
  @JoinColumn({ name: 'client_id' })
  client?: Client;
}