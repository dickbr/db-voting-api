import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { RoleEnum } from "core/enum/role.enum";

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

  @Column({enum: RoleEnum, type: `enum`})
  role!: RoleEnum
}