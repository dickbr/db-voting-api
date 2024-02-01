import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class Input {
   
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

  @IsNumber()
  @IsNotEmpty()
  session_time!: number;

  @IsString()
  @IsNotEmpty()
  category!: string;
}