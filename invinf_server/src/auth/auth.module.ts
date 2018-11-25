import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategyService } from './strategies/jwt-strategy/jwt-strategy.service';

@Module({
  exports: [AuthService],
  providers: [AuthService, JwtStrategyService],
})
export class AuthModule { }
