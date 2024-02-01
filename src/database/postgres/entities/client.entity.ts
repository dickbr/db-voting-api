import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Vote } from "./vote.entity";
import { ClientSession } from "./client-session.entity";

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column() 
  cpf!: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => Vote, vote => vote.client)
  @JoinColumn({referencedColumnName: 'client_id'})
  votes?: Vote[];

  @OneToMany(() => ClientSession, client_session => client_session.client)
  @JoinColumn({ referencedColumnName: 'client_id' })
  client_session?: ClientSession[];
}