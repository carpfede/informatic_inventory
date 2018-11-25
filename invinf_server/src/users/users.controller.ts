import { Controller, Get, UseGuards, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from 'src/auth/dto/login-response.dto';
import { LoginModel } from 'src/auth/dto/login.dto';

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
        return this.usersService.login(req)
    }
}
