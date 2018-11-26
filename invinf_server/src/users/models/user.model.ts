import { Typegoose, prop, plugin, staticMethod, ModelType, instanceMethod } from 'typegoose';
import { Employee } from 'src/employees/models/employee.model';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator)
export class User extends Typegoose {
    @prop({ unique: true, required: [true, 'El usuario es requerido'] })
    userName: string;

    @prop({ required: [true, 'La contraseña es requerida'] })
    password: string;

    @prop({ ref: Employee, required: [true, 'Debe estar vinculado a un empleado'], unique: true })
    employee_id: Employee;

    @instanceMethod
    validatePassword(pass: string) {
        return this.password === pass;
    }

    @prop({ default: false })
    disabled: Boolean;
}

export const UserModel = new User().getModelForClass(User, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'users' },
});

