import { Typegoose, prop, plugin } from 'typegoose';
import { Employee } from 'src/employees/models/employee.model';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator)
export class User extends Typegoose {
    @prop({ unique: true, required: true })
    userName: string;

    @prop({ required: true })
    password: string;

    @prop({ ref: Employee, required: true, unique: true })
    employee_id: Employee;
}

export const UserModel = new User().getModelForClass(User, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'users' },
});