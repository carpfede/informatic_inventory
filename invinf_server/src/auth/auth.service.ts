import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  createToken(user) {
    const expiresIn = 3600;

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
    return { expiresIn, accessToken };
  }
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findOne({ userName: payload.userName });
  }
}
