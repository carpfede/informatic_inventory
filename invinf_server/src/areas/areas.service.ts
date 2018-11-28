import { Injectable } from '@nestjs/common';
import { AreaResponse } from './dto/area.response.dto';
import { AreaModel, Area } from './models/area.model';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

@Injectable()
export class AreasService {

    async findAll(): Promise<AreaResponse> {
        try {
            const areas = await AreaModel.find();
            return new AreaResponse(areas);
        } catch (errors) {
            return new AreaResponse(null, errors);
        }
    }

    async create(createArea: Area): Promise<AreaResponse> {
        try {
            const createdArea = new AreaModel(createArea);
            await createdArea.save();
            return new AreaResponse(createdArea);
        } catch (errors) {
            return new AreaResponse(null, errors.errors);
        }
    }

    async findById(id: mongoose.Types.ObjectId): Promise<AreaResponse> {
        try {
            const area = await AreaModel.findById(id);
            return new AreaResponse(area);
        } catch (errors) {
            return new AreaResponse(null, errors.errors);
        }
    }

    async find(filter: {}): Promise<AreaResponse> {
        try {
            const area = await AreaModel.findOne(filter);
            return new AreaResponse(area);
        } catch (errors) {
            return new AreaResponse(null, errors.errors);
        }
    }

    async edit(id: string, area: Area): Promise<AreaResponse> {
        try {
            await AreaModel.update({ _id: new ObjectId(id) }, area);
            return new AreaResponse();
        } catch (error) {
            return new AreaResponse(null, error)
        }
    }

    async disable(id: string, disable: {}): Promise<AreaResponse> {
        try {
            await AreaModel.update({ _id: new ObjectId(id) }, disable);
            return new AreaResponse();
        } catch (error) {
            return new AreaResponse(null, error.errors);
        }
    }

    async enable(id: string, enable: {}): Promise<AreaResponse> {
        try {
            await AreaModel.update({ _id: new ObjectId(id) }, enable);
            return new AreaResponse();
        } catch (error) {
            return new AreaResponse(null, error.errors);
        }
    }
}
