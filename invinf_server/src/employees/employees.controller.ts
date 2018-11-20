import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { Employee } from './models/employee.model';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post('create')
    // @UseGuards(AuthGuard('jwt'))
    public async create(@Response() res, @Body() createUserDto: Employee) {
        const result = await this.employeesService.create(createUserDto);
        // let data = result.data;
        // if (!data.succes) {
        //   return res.status(HttpStatus.BAD_REQUEST).json(result);
        // }
        // return res.status(HttpStatus.OK).json(result);
        return res.json(result);
    }
}
