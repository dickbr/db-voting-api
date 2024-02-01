import { IsNotEmpty, IsString } from "class-validator";

export class CreateTopicRequest {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsString()
  @IsNotEmpty()
  session_id!: string;

}
