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

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('register')
  public async register() {
    // const result = await this.authService.register(createUserDto as IUser);
    // if (!result.success) {
    //   return res.status(HttpStatus.BAD_REQUEST).json(result);
    // }
    // return res.status(HttpStatus.OK).json(result);
  }

  @Get('/login/:userName?:password?')
  public async login(@Query() params: LoginUserDto): Promise<LoginResponse> {
    const response = await this.usersService.findOne({ userName: params.userName });
    if (!response || !response.user) {
      return new LoginResponse(null, ['Usuario no encontrado']);
    }
    else if (response.user.validatePassword(params.password)) {
      const token = this.authService.createToken(response.user);
      return new LoginResponse(token);
    } else {
      return new LoginResponse(null, ['El usuario y la contraseña no coinciden']);
    }

  }
}
