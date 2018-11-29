import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';
import { Equipe } from 'src/equipes/models/equipe.model';
import { ObjectID } from 'mongodb';

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
    component: Component;

    @prop({ ref: Equipe, required: [true, 'Debe estar vinculado a un equipo'] })
    equipe_id: ObjectID;

    @prop({ default: false })
    disabled: Boolean;
}

export const MotherboardModel = new Motherboard().getModelForClass(Motherboard, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'motherboards' },
});