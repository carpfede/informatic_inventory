import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';
import { Equipe } from 'src/equipes/models/equipe.model';
import { ObjectID } from 'mongodb';

@plugin(uniqueValidator)
export class RAM extends Typegoose {
    @prop({ required: true })
    capacity: string;

    @prop({ required: true })
    frequency: string;

    @prop({ ref: Component, required: [true, 'Debe estar vinculado a un componente'] })
    component: Component;

    @prop({ ref: Equipe, required: [true, 'Debe estar vinculado a un equipo'] })
    equipe_id: ObjectID;

    @prop({ default: false })
    disabled: Boolean;
}

export const RAMModel = new RAM().getModelForClass(RAM, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'rams' },
});