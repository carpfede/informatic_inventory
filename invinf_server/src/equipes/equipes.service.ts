import { Injectable } from '@nestjs/common';
import { EquipesResponse } from './dto/equipes.response.dto';
import { EquipeModel } from './models/equipe.model';
import { ComponentsService } from 'src/components/components.service';
import { ComponentDataResponse } from 'src/components/dto/component-date.response';
import { ProvidersService } from 'src/providers/providers.service';
import { Provider } from 'src/providers/model/provider.model';

@Injectable()
export class EquipesService {

    constructor(private readonly componentService: ComponentsService, private readonly providerService: ProvidersService) { }

    // GET
    public async findall(): Promise<EquipesResponse> {
        try {
            const equipes = await EquipeModel.find();
            return new EquipesResponse(equipes);
        } catch (error) {
            return new EquipesResponse(null, error);
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
}
