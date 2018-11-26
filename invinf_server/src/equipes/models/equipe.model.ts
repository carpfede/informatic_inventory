import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator)
export class Equipe extends Typegoose {
    @prop({ required: true })
    dateEntry: Date;

    @prop({ required: true })
    avgLife: string;

    @prop({ required: true })
    description: string;


}

export const EquipeModel = new Equipe().getModelForClass(Equipe, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'equipes' },
});