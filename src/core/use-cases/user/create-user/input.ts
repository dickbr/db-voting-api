import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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

}