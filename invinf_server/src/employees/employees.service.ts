import { Injectable } from '@nestjs/common';
import { Employee, EmployeeModel } from './models/employee.model';
import { CreateEmployeeResponse } from './dtos/createEmployeeResponse.dto';

@Injectable()
export class EmployeesService {

    async create(createEmployee: Employee): Promise<CreateEmployeeResponse> {
        try {
            const createdEmployee = new EmployeeModel(createEmployee);
            await createdEmployee.save();
            return new CreateEmployeeResponse(createdEmployee);
        } catch (errors) {
            return new CreateEmployeeResponse(null, errors.errors);
        }
    }
}