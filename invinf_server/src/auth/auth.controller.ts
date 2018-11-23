import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Response,
  Query,
} from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { LoginResponse } from './dto/loginResponse.dto';
import { EmployeesService } from 'src/employees/employees.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly employeeService: EmployeesService,
  ) { }

  @Get('/login/:userName?:password?')
  public async login(@Query() params: LoginUserDto): Promise<LoginResponse> {
    const response = await this.usersService.findOne({ userName: params.userName });
    if (!response || !response.user) {
      return new LoginResponse(null, ['Usuario no encontrado']);
    }
    else if (response.user.validatePassword(params.password)) {
      const tok = this.authService.createToken(response.user);
      const r = await this.employeeService.findById(response.user.employee_id);
      const res = {
        name: r.employee.firstName,
        token: tok,
      };
      return new LoginResponse(res);
    } else {
      return new LoginResponse(null, ['El usuario y la contraseña no coinciden']);
    }

  }
}
