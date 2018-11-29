import { Typegoose, prop } from "typegoose";
import * as mongoose from 'mongoose';

export class Provider extends Typegoose {
    @prop()
    name: string;
}

export const ProviderModel = new Provider().getModelForClass(Provider, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'providers' },
})