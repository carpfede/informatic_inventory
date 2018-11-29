import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Component } from './component.model';
import { Equipe } from 'src/equipes/models/equipe.model';
import { ObjectID } from 'mongodb';

@plugin(uniqueValidator)
export class Monitor extends Typegoose {
    @prop({ required: true })
    resolution: string;

    @prop({ required: true })
    type: string;

    @prop({ required: true })
    connector: string;

    @prop({ required: true })
    inches: string;

    @prop({ ref: Component, required: [true, 'Debe estar vinculado a un componente'] })
    component: Component;

    @prop({ ref: Equipe, required: [true, 'Debe estar vinculado a un equipo'] })
    equipe_id: ObjectID;
    
    @prop({ default: false })
    disabled: Boolean;
}

export const MonitorModel = new Monitor().getModelForClass(Monitor, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'monitors' },
});