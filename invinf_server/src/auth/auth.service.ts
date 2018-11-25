import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { SignOptions, sign } from 'jsonwebtoken';
import { JWT_KEY } from '../common/constants/constants'
import { JwtPayload } from './jwt-payload';
import { InstanceType } from 'typegoose';
import { User, UserModel } from 'src/users/models/user.model';
@Injectable()
export class AuthService {
    private readonly jwtOptions: SignOptions;
    private readonly jwtKey: string;

    constructor() {
        this.jwtOptions = { expiresIn: '12h' };
        this.jwtKey = JWT_KEY
    }

    async signPayload(payload: JwtPayload): Promise<string> {
        return sign(payload, this.jwtKey, this.jwtOptions);
    }

    async validatePayload(payload: JwtPayload): Promise<InstanceType<User>> {
        const user = await UserModel.findOne({ username: payload.userName });
        return user;
    }
}