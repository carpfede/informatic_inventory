import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
  ) {
    super(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      // userModel.authenticate(),
    );
  }
}
