import { IsNotEmpty, IsString } from "class-validator";

export class Input {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;
  
  @IsString()
  @IsNotEmpty()
  session_id!: string;
}