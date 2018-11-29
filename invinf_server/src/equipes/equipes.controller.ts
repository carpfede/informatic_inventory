import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComponentDataResponse } from 'src/components/dto/component-date.response';
import { EquipesService } from './equipes.service';
import { EquipesResponse } from './dto/equipes.response.dto';
import { Provider } from 'src/providers/model/provider.model';

@Controller('equipes')
export class EquipesController {

    constructor(private readonly equipeService: EquipesService) { }

    // GET
    @Get('/types')
    @UseGuards(AuthGuard('jwt'))
    public async types(): Promise<ComponentDataResponse> {
        const result = await this.equipeService.getTypes();
        return result;
    }

    @Get('/providers')
    @UseGuards(AuthGuard('jwt'))
    public async providers(): Promise<Provider[]> {
        const result = await this.equipeService.getProviders();
        return result;
    }

    @Get('/findall')
    @UseGuards(AuthGuard('jwt'))
    public async findall(): Promise<EquipesResponse> {
        const result = this.equipeService.findall();
        return result;
    }

    @Get('/lastCode')
    @UseGuards(AuthGuard('jwt'))
    public async lastCode(): Promise<number> {
        const result = this.equipeService.lastCode();
        return result;
    }
    //SET
}
