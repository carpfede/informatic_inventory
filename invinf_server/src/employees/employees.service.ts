import { Injectable } from '@nestjs/common';
import { Employee, EmployeeModel } from './models/employee.model';
import { EmployeeResponse } from './dtos/employee.response.dto';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { UserModel } from 'src/users/models/user.model';

@Injectable()
export class EmployeesService {

    async lastIdNumber(): Promise<number> {
        try {
            const employee = await EmployeeModel.findOne().sort({ field: 'asc', _id: -1 });
            return employee.idNumber;
        } catch (errors) {
            return null;
        }
    }

    async findAll(): Promise<EmployeeResponse> {
        try {
            const employees = await EmployeeModel.find();
            return new EmployeeResponse(employees);
        } catch (errors) {
            return new EmployeeResponse(null, errors);
        }
    }

    async create(createEmployee: Employee): Promise<EmployeeResponse> {
        try {
            const createdEmployee = new EmployeeModel(createEmployee);
            await createdEmployee.save();
            return new EmployeeResponse(createdEmployee);
        } catch (errors) {
            return new EmployeeResponse(null, errors.errors);
        }
    }

    async findById(id: mongoose.Types.ObjectId): Promise<EmployeeResponse> {
        try {
            const employee = await EmployeeModel.findById(id);
            return new EmployeeResponse(employee);
        } catch (errors) {
            return new EmployeeResponse(null, errors.errors);
        }
    }

    async find(filter: {}): Promise<EmployeeResponse> {
        try {
            const employee = await EmployeeModel.findOne(filter);
            return new EmployeeResponse(employee);
        } catch (errors) {
            return new EmployeeResponse(null, errors.errors);
        }
    }

    async edit(id: string, employee: Employee): Promise<EmployeeResponse> {
        try {
            await EmployeeModel.update({ _id: new ObjectId(id) }, employee);
            return new EmployeeResponse();
        } catch (error) {
            return new EmployeeResponse(null, error.errors);
        }
    }

    async disable(id: string, disable: {}): Promise<EmployeeResponse> {
        try {
            await EmployeeModel.update({ _id: new ObjectId(id) }, disable);
            await UserModel.update({ employee_id: new ObjectId(id) }, disable);
            return new EmployeeResponse();
        } catch (error) {
            return new EmployeeResponse(null, error.errors);
        }
    }

    async enable(id: string, enable: {}): Promise<EmployeeResponse> {
        try {
            await EmployeeModel.update({ _id: new ObjectId(id) }, enable);
            await UserModel.update({ employee_id: new ObjectId(id) }, enable);
            return new EmployeeResponse();
        } catch (error) {
            return new EmployeeResponse(null, error.errors);
        }
    }
}