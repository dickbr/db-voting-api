import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Vote } from "./vote.entity";
import { RoleEnum } from "core/enum/role.enum";
import { UserSession } from "./user-session.entity";

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column() 
  cpf!: string;

  @Column({nullable: true})
  name?: string;

  @Column({nullable: true})
  email?: string;

  @Column({nullable: true})
  password?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @OneToMany(() => Vote, vote => vote.user)
  @JoinColumn({referencedColumnName: 'user_id'})
  votes?: Vote[];

  @Column({enum: RoleEnum, type: `enum`})
  role!: RoleEnum

  @OneToMany(() => UserSession, userSession => userSession.user)
  @JoinColumn({referencedColumnName: 'user_id'})
  user_session?: UserSession[];
}