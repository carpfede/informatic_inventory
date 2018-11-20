import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { IUser } from '../users/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { debug } from 'console';
import { RegistrationStatus } from './interfaces/registrationStatus.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectModel('User') private readonly userModel: PassportLocalModel<IUser>,
  ) {}

  // async register(user: IUser) {
  //   let status: RegistrationStatus = {
  //     success: true,
  //     message: 'user register',
  //   };
  //   await this.userModel.register(
  //     new this.userModel({
  //       username: user.email,
  //       firstName: user.firstName,
  //       lastName: user.lastName,
  //     }),
  //     user.password,
  //     err => {
  //       if (err) {
  //         debug(err);
  //         status = { success: false, message: err };
  //       }
  //     },
  //   );
  //   return status;
  // }

  createToken(user) {
    // tslint:disable-next-line:no-console
    console.log('get the expiration');
    const expiresIn = 3600;
    // tslint:disable-next-line:no-console
    console.log('sign the token');
    // tslint:disable-next-line:no-console
    console.log(user);

    const accessToken = jwt.sign(
      {
        id: user.id,
        userName: user.username,
        firstname: user.firstName,
        lastname: user.lastName,
      },
      'ILovePokemon',
      { expiresIn },
    );
    // tslint:disable-next-line:no-console
    console.log('return the token');
    // tslint:disable-next-line:no-console
    console.log(accessToken);
    return { expiresIn, accessToken };
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findByUserName(payload.userName);
  }
}
