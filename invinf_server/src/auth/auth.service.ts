import * as jwt from 'jsonwebtoken';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Model, PassportLocalModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {

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
    // return await this.usersService.findByUserName(payload.userName);
  }
}
