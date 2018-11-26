import { Controller, Get, UseGuards, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { LoginResponse } from 'src/auth/dto/loginResponse.dto';
import { LoginModel } from 'src/auth/dto/login.dto';
import * as _ from 'lodash';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Post('create')
    public async create(@Response() res, @Body() createUser: User) {
        const result = await this.usersService.create(createUser);
        return res.json(result);
    }

    @Post('login')
    public async login(@Body() req: LoginModel): Promise<LoginResponse> {
        const res = await this.usersService.login(req)
        if (_.some(res.errors)) {
            return new LoginResponse(null, null, null, res.errors);
        }
        return new LoginResponse(res.user.token, res.user.userName, res.user.firstName);
    }
}
