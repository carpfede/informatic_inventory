import {
  Controller,
  Post,
  Res,
  Session,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { EmployeesService } from 'src/employees/employees.service';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly employeeService: EmployeesService,
  ) { }

  @Post('/login')
  @ApiBearerAuth()
  public async login(@Req() req, @Res() res, @Session() session) {
    return res.status(HttpStatus.OK).send();
  }
}
