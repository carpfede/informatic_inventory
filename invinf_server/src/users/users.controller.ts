import { Controller, Get } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async findAll(): Promise<IUser[]> {
      return this.usersService.findAll();
    }
}
