import { Body, Controller, Post } from "@nestjs/common";
import { Auth } from "../../core/use-cases/auth/auth.use-case";
import { SignInRequest } from "dtos/auth/sign-in.request";

@Controller()
export class AuthController{
  constructor(
    private readonly auth: Auth
  ){}

  @Post('sign-in')
  async signIn(
    @Body() body: SignInRequest
  ){
    return await this.auth.execute(body)
  }
}