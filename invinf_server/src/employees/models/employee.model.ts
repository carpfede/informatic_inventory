import { Typegoose, prop } from 'typegoose';
import * as mongoose from 'mongoose';

export class Employee extends Typegoose {
    @prop({ required: true })
    firstName: string;

    @prop({ required: true })
    lastName: string;

    @prop({ required: true })
    email: string;

    @prop()
    birthday: Date;

    @prop({ required: true, unique: true })
    docket: number;
}

export const EmployeeModel = new Employee().getModelForClass(Employee, {
    existingMongoose: mongoose,
    existingConnection: mongoose.connection,
    schemaOptions: { collection: 'employees' },
});