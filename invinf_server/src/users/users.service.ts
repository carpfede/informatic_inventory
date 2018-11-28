import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { User, UserModel } from './models/user.model';
import { CreateUserResponse } from './dtos/createUserResponse.dto';
import { LoginModel } from 'src/auth/dto/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtPayload } from 'src/auth/jwt-payload';
import { EmployeeModel } from 'src/employees/models/employee.model';

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

    async login(loginDto: LoginModel): Promise<CreateUserResponse> {
        const { username, pass } = loginDto;
        const user = await UserModel.findOne({ userName: username })
        if (!user || user.password !== pass || user.disabled) {
            return new CreateUserResponse(null, ['Credenciales invalidas']);
        }

        const employee = await EmployeeModel.findById(user.employee_id);

        const payload: JwtPayload = {
            userName: user.userName,
            password: user.password
        }

        const token = await this.authService.signPayload(payload);

        const response = {
            token: token,
            userName: user.userName,
            firstName: employee.firstName
        }

        return new CreateUserResponse(response);
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
