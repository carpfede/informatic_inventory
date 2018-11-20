import { Typegoose, prop } from 'typegoose';
import { Employee } from 'src/employees/models/employee.model';
import * as mongoose from 'mongoose';

export class User extends Typegoose {
    @prop({ unique: true, required: true })
    userName: string;

    @prop({ required: true })
    password: string;

    @prop({ ref: Employee, required: true })
    employee: Employee;
}

export const UserModel = new User().getModelForClass(User, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'users' },
});