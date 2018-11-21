import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { Employee } from './models/employee.model';
import { EmployeesService } from './employees.service';
import * as _ from 'lodash';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post('create')
    // @UseGuards(AuthGuard('jwt'))
    public async create(@Response() res, @Body() createEmployee: Employee) {
        const result = await this.employeesService.create(createEmployee);
        return res.json(result);
    }
}
