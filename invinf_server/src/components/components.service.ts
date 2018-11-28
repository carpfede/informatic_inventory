import { Injectable } from '@nestjs/common';
import { ComponentDataResponse } from './dto/component-date.response';
import types from './dto/component-type.dto';
import _ from "lodash";
@Injectable()
export class ComponentsService {

    public async getTypes(): Promise<ComponentDataResponse> {
        if (_.some(types)) {
            return new ComponentDataResponse(types);
        } else {
            return new ComponentDataResponse(null, ['No hay tipos']);
        }
    }
}
