import { Controller, Post, Body, Response, Get, UseGuards, Query } from '@nestjs/common';
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


    //GET

    @Get('/lastIdNumber')
    @UseGuards(AuthGuard('jwt'))
    public async lastIdNumber(): Promise<number> {
        const result = this.employeesService.lastIdNumber();
        return await result;
    }

    @Get('/findAll')
    @UseGuards(AuthGuard('jwt'))
    public async findAll(): Promise<EmployeeResponse> {
        const result = this.employeesService.findAll();
        return await result;
    }

    @Get('/find')
    @UseGuards(AuthGuard('jwt'))
    public async find(@Query() filter): Promise<EmployeeResponse> {
        const result = this.employeesService.find(filter);
        return await result;
    }

    // POST
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

    @Post('/edit')
    @UseGuards(AuthGuard('jwt'))
    public async edit(@Body() req): Promise<EmployeeResponse> {
        const result = this.employeesService.edit(req.id, req.employee);
        return result;
    }

    @Post('/disable')
    @UseGuards(AuthGuard('jwt'))
    public async disable(@Body() req): Promise<EmployeeResponse> {
        const result = await this.employeesService.disable(req.id, req.disable);
        return result;
    }

    @Post('/enable')
    @UseGuards(AuthGuard('jwt'))
    public async enable(@Body() req): Promise<EmployeeResponse> {
        const result = await this.employeesService.enable(req.id, req.enable);
        return result;
    }

}
