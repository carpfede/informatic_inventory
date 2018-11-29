import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';
import { Equipe } from 'src/equipes/models/equipe.model';

@plugin(uniqueValidator)
export class Motherboard extends Typegoose {

    @prop({ required: true })
    type: string;

    @prop({ required: true })
    socket: string;

    @prop({ required: true })
    chipset: string;

    @prop({ required: true })
    width: number;

    @prop({ required: true })
    height: number;

    @prop({ ref: Component, required: [true, 'Debe estar vinculado a un componente'] })
    component_id: Component;

    @prop({ ref: Equipe, required: [true, 'Debe estar vinculado a un equipo'] })
    equipe_id: Equipe;

    @prop({ default: false })
    disabled: Boolean;
}

export const PeripheralModel = new Motherboard().getModelForClass(Motherboard, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'motherboards' },
});