import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';

@plugin(uniqueValidator)
export class Storage extends Typegoose {
    @prop({ required: true })
    capacity: string;

    @prop({ required: true })
    type: string;

    @prop({ required: true })
    dimension: string;

    @prop({ required: true })
    latency: string;

    @prop({ ref: Component, required: [true, 'Debe estar vinculado a un componente'] })
    component_id: Component;
}

export const PeripheralModel = new Storage().getModelForClass(Storage, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'storages' },
});