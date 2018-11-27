import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';

@plugin(uniqueValidator)
export class Microprocessor extends Typegoose {
    @prop({ required: true })
    frequency: string;

    @prop({ required: true })
    socket: string;

    @prop({ required: true })
    core: string;

    @prop({ ref: Component, required: [true, 'Debe estar vinculado a un componente'] })
    component_id: Component;
}

export const PeripheralModel = new Microprocessor().getModelForClass(Microprocessor, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'microprocessors' },
});