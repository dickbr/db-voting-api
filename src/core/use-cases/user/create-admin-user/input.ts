import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RoleEnum } from "core/enum";

export class Input {
   
  @IsString()
  @IsNotEmpty()
  cpf!: string;

  @IsString()
  @IsOptional()
  name?: string;
  
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;

}