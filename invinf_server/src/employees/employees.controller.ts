import { Controller, Post, Body, Response, HttpStatus, Get, UseGuards, Query } from '@nestjs/common';
import { Employee } from './models/employee.model';
import { EmployeesService } from './employees.service';
import * as _ from 'lodash';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.model';
import { EmployeeResponse } from './dtos/employee.response.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('employees')
export class EmployeesController {
    constructor(
        private readonly employeesService: EmployeesService,
        private readonly usersService: UsersService,
    ) { }

    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    public async create(@Response() res, @Body() createEmployee: Employee) {
        const result = await this.employeesService.create(createEmployee);
        if (!_.some(result.errors)) {
            const user = {
                userName: result.employee.idNumber,
                password: 'default123',
                employee_id: result.employee._id,
            };
            await this.usersService.create(user as User);
        }
        return res.json(result);
    }

    @Get('/findAll')
    @UseGuards(AuthGuard('jwt'))
    public async findAll(): Promise<EmployeeResponse> {
        const result = this.employeesService.findAll();
        return await result;
    }

    @Get('/lastIdNumber')
    @UseGuards(AuthGuard('jwt'))
    public async lastIdNumber(): Promise<number> {
        const result = this.employeesService.lastIdNumber();
        return await result;
    }

    @Post('/edit')
    @UseGuards(AuthGuard('jwt'))
    public async edit(@Body() req): Promise<EmployeeResponse> {
        const result = this.employeesService.update(req.id, req.employee);
        return result;
    }
}
