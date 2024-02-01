import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateVoteRequest {
  @IsString()
  @IsNotEmpty()
  user_id!: string;

  @IsString()
  @IsNotEmpty()
  topic_id!: string;

  @IsBoolean()
  @IsNotEmpty()
  choice!: boolean;

  @IsString()
  @IsNotEmpty()
  session_id!: string;
}
