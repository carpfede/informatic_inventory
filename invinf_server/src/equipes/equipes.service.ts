import { Injectable } from '@nestjs/common';
import { EquipesResponse } from './dto/equipes.response.dto';
import { EquipeModel } from './models/equipe.model';
import { ComponentsService } from 'src/components/components.service';
import { ComponentDataResponse } from 'src/components/dto/component-date.response';
import { ProvidersService } from 'src/providers/providers.service';
import { Provider } from 'src/providers/model/provider.model';
import { EquipeResponse } from './dto/equipe.response.dto';
import { AreasService } from 'src/areas/areas.service';
import { EmployeeEquipeModel } from './models/empleado_equipo.model';
import * as _ from 'lodash';
import { ObjectId } from 'mongodb';

@Injectable()
export class EquipesService {

    constructor(private readonly componentService: ComponentsService,
        private readonly providerService: ProvidersService,
        private readonly areaService: AreasService) { }

    // GET
    public async findall(): Promise<EquipesResponse> {
        try {
            const equipes = await EquipeModel.find();
            return new EquipesResponse(equipes);
        } catch (error) {
            return new EquipesResponse(null, error);
        }
    }

    async find(filter: {}): Promise<EquipesResponse> {
        try {
            const equipes = await EquipeModel.findOne(filter);
            return new EquipesResponse(equipes);
        } catch (errors) {
            return new EquipesResponse(null, errors.errors);
        }
    }

    async findEmployees(filter: {}): Promise<EquipesResponse> {
        console.log(filter);
        try {
            const ids = await EmployeeEquipeModel.find(filter);
            return new EquipesResponse(ids);
        } catch (errors) {
            return new EquipesResponse(null, errors.errors);
        }
    }

    async lastCode(): Promise<number> {
        try {
            const equipe = await EquipeModel.findOne().sort({ field: 'asc', _id: -1 });
            return equipe.code;
        } catch (errors) {
            return null;
        }
    }

    async getTypes(): Promise<ComponentDataResponse> {
        return this.componentService.getTypes();
    }

    async getProviders(): Promise<Provider[]> {
        return this.providerService.findAll();
    }

    // SET
    async create(equipe: any): Promise<EquipeResponse> {
        try {
            const createdEquipe = new EquipeModel(equipe);
            const resArea = await this.areaService.findById(equipe.area);
            createdEquipe.area = resArea.area;
            await createdEquipe.save();
            _.forEach(equipe.employees, async e => {
                const employee_model = await new EmployeeEquipeModel({ employee_id: e._id, equipe_id: createdEquipe._id });
                await employee_model.save();
            })
            await this.componentService.createAll(equipe.components, createdEquipe._id)
            return new EquipeResponse(createdEquipe);
        } catch (errors) {
            return new EquipeResponse(null, errors.errors);
        }
    }

    async disable(id: string, disable: {}): Promise<EquipeResponse> {
        try {
            await EquipeModel.update({ _id: new ObjectId(id) }, disable);
            return new EquipeResponse();
        } catch (error) {
            return new EquipeResponse(null, error.errors);
        }
    }

    async enable(id: string, enable: {}): Promise<EquipeResponse> {
        try {
            await EquipeModel.update({ _id: new ObjectId(id) }, enable);
            return new EquipeResponse();
        } catch (error) {
            return new EquipeResponse(null, error.errors);
        }
    }
}
