import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(user: { username: string, password: string }): Promise<any> {
    return await this.usersService.findOne(user);
  }
}
