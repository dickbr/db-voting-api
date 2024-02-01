import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Session } from "./session.entity";
import { Vote } from "./vote.entity";

@Entity('topics')
export class Topic extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column() 
  title!: string;

  @Column() 
  description!: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @ManyToOne(() => Session, session => session.topics)
  @JoinColumn({name: 'session_id'})
  session?: Session;

  @OneToMany(() => Vote, vote => vote.topic)
  @JoinColumn({referencedColumnName: 'topic_id'})
  votes?: Vote[];
}