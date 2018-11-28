import { Injectable } from '@nestjs/common';
import { EquipesResponse } from './dto/equipes.response.dto';
import { EquipeModel } from './models/equipe.model';

@Injectable()
export class EquipesService {
    public async findall(): Promise<EquipesResponse> {
        try {
            const equipes = await EquipeModel.find();
            return new EquipesResponse(equipes);
        } catch (error) {
            return new EquipesResponse(null, error);
        }
    }
}
