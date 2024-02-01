import { IsNotEmpty, IsString } from "class-validator";

export class UpdateTopicRequest {
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
