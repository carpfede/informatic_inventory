import { Typegoose, prop, plugin } from 'typegoose';
import * as mongoose from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';
import { Provider } from '../../providers/model/provider.model';

@plugin(uniqueValidator)
export class Component extends Typegoose {
    @prop({ required: true })
    price: Number;

    @prop({ required: true })
    warranty: Number;

    @prop({ required: true })
    model: string;

    @prop({ required: true })
    mark: string;

    @prop({ required: true })
    avgLife: Number;

    @prop({ ref: Provider, required: true })
    provider_id: Provider;
}

export const ComponentModel = new Component().getModelForClass(Component, {
    existingMongoose: mongoose,
    schemaOptions: { collection: 'components' },
});