import { Controller, Get, UseGuards, Post, Response, Body, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComponentDataResponse } from 'src/components/dto/component-date.response';
import { EquipesService } from './equipes.service';
import { EquipesResponse } from './dto/equipes.response.dto';
import { Provider } from 'src/providers/model/provider.model';
import { EquipeResponse } from './dto/equipe.response.dto';

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

    @Get('/find')
    @UseGuards(AuthGuard('jwt'))
    public async find(@Query() filter): Promise<EquipesResponse> {
        const result = this.equipeService.find(filter);
        return await result;
    }

    @Get('/lastCode')
    @UseGuards(AuthGuard('jwt'))
    public async lastCode(): Promise<number> {
        const result = this.equipeService.lastCode();
        return result;
    }

    @Get('/findEmployees')
    @UseGuards(AuthGuard('jwt'))
    public async findEmployees(@Query() filter){
        const result = this.equipeService.findEmployees(filter);
        return await result;
    }
    //SET

    @Post('/create')
    @UseGuards(AuthGuard('jwt'))
    public async create(@Response() res, @Body() body: {}): Promise<EquipeResponse> {
        const result = await this.equipeService.create(body);
        return res.json(result);
    }

    @Post('/disable')
    @UseGuards(AuthGuard('jwt'))
    public async disable(@Body() req): Promise<EquipeResponse> {
        const result = await this.equipeService.disable(req.id, req.disable);
        return result;
    }

    @Post('/enable')
    @UseGuards(AuthGuard('jwt'))
    public async enable(@Body() req): Promise<EquipeResponse> {
        const result = await this.equipeService.enable(req.id, req.enable);
        return result;
    }
}
