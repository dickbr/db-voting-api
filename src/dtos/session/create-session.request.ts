import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSessionRequest {
   
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDate()
  @IsOptional()
  start_date?: Date;
  
  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsNotEmpty()
  category!: string;

  @IsNumber()
  @IsNotEmpty()
  session_time!: number

}