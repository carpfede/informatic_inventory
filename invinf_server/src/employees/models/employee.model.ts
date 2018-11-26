import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator)
export class Employee extends Typegoose {
    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true, unique: true })
    email: string;

    @prop()
    birthday: Date;

    @prop({ required: true, unique: true })
    idNumber: number;

    @prop()
    telephone: number;

    @prop({ default: false })
    disabled: Boolean;
}

export const EmployeeModel = new Employee().getModelForClass(Employee, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'employees' },
});