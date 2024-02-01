import { IsNotEmpty, IsString } from "class-validator";

export class Input {
  @IsString()
  @IsNotEmpty()
  cpf!: string;
}