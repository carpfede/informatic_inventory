import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { User, UserModel } from './models/user.model';
import { CreateUserResponse } from './dtos/createUserResponse.dto';
import { LoginModel } from 'src/auth/dto/login.dto';
import { LoginResponse } from 'src/auth/dto/login-response.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/jwt-payload';

@Injectable()
export class UsersService {

    constructor(@Inject(forwardRef(() => AuthService)) readonly authService: AuthService) {
    }

    async create(createUser: User): Promise<CreateUserResponse> {
        try {
            const userModel = new UserModel(createUser);
            await userModel.save();
            return new CreateUserResponse(userModel);
        } catch (errors) {
            return new CreateUserResponse(null, errors.errors);
        }
    }

    async login(loginDto: LoginModel): Promise<LoginResponse> {
        const { username, pass } = loginDto;

        const user = await UserModel.findOne({ userName: username })

        if (!user || user.password !== pass) {
            throw new HttpException('Credenciales invalidas', HttpStatus.BAD_REQUEST);
        }

        const payload: JwtPayload = {
            userName: user.userName,
            password: user.password
        }

        const token = await this.authService.signPayload(payload);

        return {
            token: token,
            user: user.toJSON() as User
        }
    }

    async findOne(filter: {}): Promise<CreateUserResponse> {
        try {
            const user = await UserModel.findOne(filter);
            return new CreateUserResponse(user);
        } catch (errors) {
            return new CreateUserResponse(null, errors.errors);
        }
    }


}
