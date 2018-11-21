import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      next();
    };
  }
}