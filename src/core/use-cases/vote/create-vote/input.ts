import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class Input {
   
  @IsString()
  @IsNotEmpty()
  client_id!: string;

  @IsString()
  @IsNotEmpty()
  topic_id!: string;

  @IsBoolean()
  @IsNotEmpty()
  choice!: Boolean;

  @IsString()
  @IsNotEmpty()
  session_id!: string;
  
}