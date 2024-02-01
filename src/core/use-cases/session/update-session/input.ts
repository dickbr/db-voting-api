import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

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

  @IsDate()
  @IsOptional()
  start_date?: Date;
  
  @IsDate()
  @IsOptional()
  end_date?: Date;

  @IsString()
  @IsNotEmpty()
  category!: string;

}