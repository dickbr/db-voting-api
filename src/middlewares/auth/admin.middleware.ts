import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AdminMiddleware implements NestMiddleware {
 use(req: any, res: any, next: any) {
    const user = req.user;

    if (user && user.role === 'admin') {
      next();
    } else {
      throw new UnauthorizedException('Você não tem permissão para acessar este recurso');
    }
 }
}