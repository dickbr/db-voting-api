import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { RoleEnum } from "core/enum/role.enum";

export class CreateUserRequest {
   
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, {
    message: 'CPF inválido',
 })
  cpf!: string;

  @IsString()
  @IsOptional()
  name?: string;
  
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

}