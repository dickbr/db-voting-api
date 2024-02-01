import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Input {
  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}