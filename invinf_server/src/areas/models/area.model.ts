import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

@plugin(uniqueValidator)
export class Area extends Typegoose {
    @prop({ required: true, unique: true })
    code: string;

    @prop({ required: true })
    name: string;

    @prop({ default: false })
    disabled: Boolean;
}

export const AreaModel = new Area().getModelForClass(Area, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'areas' },
});