import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ValidateTokenMiddleware implements NestMiddleware {
    constructor(private readonly usersService: UsersService) {}
  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      next();
    };
  }
}