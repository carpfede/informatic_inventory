import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import * as passport from 'passport';

//imports
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { EmployeesModule } from 'src/employees/employees.module';

// Bearer auth
import { AppAuthGuard } from './guards/appAuth.guard';
import { HttpStrategy } from './passport/http.strategy';
import { CookieSerializer } from './dto/cookie-serializer';

@Module({
  imports: [UsersModule, EmployeesModule, HttpStrategy, AppAuthGuard, CookieSerializer],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }

