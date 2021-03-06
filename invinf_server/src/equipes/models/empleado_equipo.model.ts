import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Employee } from 'src/employees/models/employee.model';
import { Equipe } from './equipe.model';
import { ObjectID } from 'mongodb';

@plugin(uniqueValidator)
export class Employee_Equipe extends Typegoose {
    @prop({ ref: Employee, required: [true, 'Debe estar vinculado a un empleado'] })
    employee_id: ObjectID;

    @prop({ ref: Equipe, required: [true, 'Debe estar vinculado a un equipo'] })
    equipe_id: ObjectID;
}

export const EmployeeEquipeModel = new Employee_Equipe().getModelForClass(Employee_Equipe, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'employees_equipes' },
});