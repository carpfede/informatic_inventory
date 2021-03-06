import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Area } from 'src/areas/models/area.model';
import { ObjectId } from 'mongodb';
import { Employee } from 'src/employees/models/employee.model';

@plugin(uniqueValidator)
export class Equipe extends Typegoose {
    @prop({ required: true })
    code: number;

    @prop({ required: true })
    dateEntry: Date;

    @prop({ required: true })
    avgLife: string;

    @prop({ required: true })
    description: string;

    @prop({ required: true })
    state: string;

    @prop({ ref: Area, required: [true, 'Debe estar vinculado a un area'] })
    area: any;

    @prop({ default: false })
    disabled: Boolean;

    employees: Employee[];
}

export const EquipeModel = new Equipe().getModelForClass(Equipe, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'equipes' },
});