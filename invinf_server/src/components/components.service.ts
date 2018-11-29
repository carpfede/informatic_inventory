import { Injectable } from '@nestjs/common';
import { ComponentDataResponse } from './dto/component-date.response';
import types from './dto/component-type.dto';
import * as _ from "lodash";
import { ObjectId } from 'mongodb';
import { MicroprocessorModel } from './models/microprocessor.model';
import { MonitorModel } from './models/monitor.model';
import { ComponentModel } from './models/component.model';
import { MotherboardModel } from './models/motherboard.model';
import { PeripheralModel } from './models/peripheral.model';
import { PowerModel } from './models/power.model';
import { RAMModel } from './models/ram.model';
import { StorageModel } from './models/storage.model';

@Injectable()
export class ComponentsService {

    public async getTypes(): Promise<ComponentDataResponse> {
        if (_.some(types)) {
            return new ComponentDataResponse(types);
        } else {
            return new ComponentDataResponse(null, ['No hay tipos']);
        }
    }

    public async createAll(components: any, id: ObjectId) {
        _.forEach(components, async c => {
            const component = await new ComponentModel(c);
            switch (c.key) {
                case 0:
                    const microprocessor = await new MicroprocessorModel(c);
                    microprocessor.component = component;
                    microprocessor.equipe_id = id;
                    microprocessor.save();
                    break;
                case 1:
                    const monitor = await new MonitorModel(c);
                    monitor.component = component;
                    monitor.equipe_id = id;
                    monitor.save();
                    break;
                case 2:
                    const motherboard = await new MotherboardModel(c);
                    motherboard.component = component;
                    motherboard.equipe_id = id;
                    motherboard.save();
                    break;
                case 3:
                    const peripheral = await new PeripheralModel(c);
                    peripheral.component = component;
                    peripheral.equipe_id = id;
                    peripheral.save();
                    break;
                case 4:
                    const power = await new PowerModel(c);
                    power.component = component;
                    power.equipe_id = id;
                    power.save();
                    break;
                case 5:
                    const ram = await new RAMModel(c);
                    ram.component = component;
                    ram.equipe_id = id;
                    ram.save();
                    break;
                case 6:
                    const storage = await new StorageModel(c);
                    storage.component = component;
                    storage.equipe_id = id;
                    storage.save();
                    break;
            }
        })
    }
}
