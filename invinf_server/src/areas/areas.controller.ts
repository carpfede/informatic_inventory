import { Controller, Get, UseGuards, Query, Post, Body, Response } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AreaResponse } from './dto/area.response.dto';
import { AreasService } from './areas.service';
import { Area } from './models/area.model';

@Controller('areas')
export class AreasController {

    constructor(private readonly areaService: AreasService) { }

    //GET

    @Get('/findAll')
    @UseGuards(AuthGuard('jwt'))
    public async findAll(): Promise<AreaResponse> {
        const result = this.areaService.findAll();
        return await result;
    }

    @Get('/find')
    @UseGuards(AuthGuard('jwt'))
    public async find(@Query() filter): Promise<AreaResponse> {
        const result = this.areaService.find(filter);
        return await result;
    }

    // POST
    @Post('create')
    @UseGuards(AuthGuard('jwt'))
    public async create(@Response() res, @Body() createArea: Area) {
        const result = await this.areaService.create(createArea);
        return res.json(result);
    }

    @Post('/edit')
    @UseGuards(AuthGuard('jwt'))
    public async edit(@Response() res, @Body() req) {
        const result = await this.areaService.edit(req.id, req.area);
        return res.json(result);
    }

    @Post('/disable')
    @UseGuards(AuthGuard('jwt'))
    public async disable(@Response() res, @Body() req) {
        const result = await this.areaService.disable(req.id, req.disable);
        return res.json(result);
    }

    @Post('/enable')
    @UseGuards(AuthGuard('jwt'))
    public async enable(@Response() res, @Body() req) {
        const result = await this.areaService.enable(req.id, req.enable);
        return res.json(result);
    }
}
