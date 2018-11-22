import { Typegoose, prop, plugin, staticMethod, ModelType, instanceMethod } from 'typegoose';
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

    @instanceMethod
    validatePassword(pass: string) {
        return this.password === pass;
    }
}

export const UserModel = new User().getModelForClass(User, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'users' },
});