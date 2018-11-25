import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JWT_KEY } from 'src/common/constants/constants';
import { JwtPayload } from 'src/auth/jwt-payload';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_KEY
        });
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        const user = this.authService.validatePayload(payload);

        if (!user) {
            return done(new HttpException({}, HttpStatus.UNAUTHORIZED), false);
        }

        return done(null, user);
    }
}
