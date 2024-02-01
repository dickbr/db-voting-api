import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateClientRequest {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{11}$/, {
    message: 'CPF inválido',
 })
  cpf!: string;
}