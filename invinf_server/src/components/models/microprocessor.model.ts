import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';
import { Equipe } from 'src/equipes/models/equipe.model';

@plugin(uniqueValidator)
export class Microprocessor extends Typegoose {
    @prop({ required: true })
    frequency: string;

    @prop({ required: true })
    socket: string;

    @prop({ required: true })
    core: number;

    @prop({ ref: Component, required: [true, 'Debe estar vinculado a un componente'] })
    component_id: Component;

    @prop({ ref: Equipe, required: [true, 'Debe estar vinculado a un equipo'] })
    equipe_id: Equipe;

    @prop({ default: false })
    disabled: Boolean;
}

export const PeripheralModel = new Microprocessor().getModelForClass(Microprocessor, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'microprocessors' },
});