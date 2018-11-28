import { Controller, Get, UseGuards, forwardRef, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComponentDataResponse } from 'src/components/dto/component-date.response';
import { ComponentsService } from 'src/components/components.service';
import { EquipesService } from './equipes.service';
import { EquipesResponse } from './dto/equipes.response.dto';

@Controller('equipes')
export class EquipesController {

    constructor(
        // @Inject(forwardRef(() => ComponentsService)) readonly componentService: ComponentsService,
        private readonly equipeService: EquipesService) { }

    // GET
    // @Get('/types')
    // @UseGuards(AuthGuard('jwt'))
    // public async types(): Promise<ComponentDataResponse> {
    //     // const result = this.componentService.getTypes();
    //     // return result;
    // }

    @Get('/findall')
    @UseGuards(AuthGuard('jwt'))
    public async findall(): Promise<EquipesResponse> {
        const result = this.equipeService.findall();
        return result;
    }
    //SET
}
