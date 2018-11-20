import { Injectable, Inject } from '@nestjs/common';
import { Employee, EmployeeModel } from './models/employee.model';
import { InstanceType } from 'typegoose';
import * as mongoose from 'mongoose';

@Injectable()
export class EmployeesService {

    // constructor(@Inject('DbConnectionToken') private readonly connection: mongoose.Connection) { }
    async create(createEmployee: Employee): Promise<InstanceType<Employee>> {
        // tslint:disable-next-line:no-console
        console.log(EmployeeModel.base.connection);
        const createdEmployee = await EmployeeModel.create(createEmployee);
        return createdEmployee.save();
    }
}