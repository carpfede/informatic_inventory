import { Controller, Get, UseGuards, Post, Response, Body, HttpStatus } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create')
  // @UseGuards(AuthGuard('jwt'))
  public async create(@Response() res, @Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    // let data = result.data;
    // if (!data.succes) {
    //   return res.status(HttpStatus.BAD_REQUEST).json(result);
    // }
    // return res.status(HttpStatus.OK).json(result);
    return res.json(result);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<IUser[]> {
    return this.usersService.findAll();
  }
}
