import {
  Controller,
  UseGuards,
  HttpStatus,
  Response,
  Post,
  Body,
} from '@nestjs/common';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiUseTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/models/user.model';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  @Post('register')
  public async register(@Response() res, @Body() createUser: User) {
    // const result = await this.authService.register(createUserDto as IUser);
    // if (!result.success) {
    //   return res.status(HttpStatus.BAD_REQUEST).json(result);
    // }
    // return res.status(HttpStatus.OK).json(result);
  }

  @Post('login')
  // @UseGuards(AuthGuard('jwt'))
  public async login(@Response() res, @Body() login: LoginUserDto) {
    return await this.usersService
      .findOne({ username: login.userName })
      .then(user => {
        if (!user) {
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'User Not Found',
          });
        } else {
          // tslint:disable-next-line:no-console
          console.log('start getting the token');
          const token = this.authService.createToken(user);
          // tslint:disable-next-line:no-console
          console.log(token);
          return res.status(HttpStatus.OK).json(token);
        }
      });
  }
}
