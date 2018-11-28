import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ComponentsService } from './components.service';
import { ComponentDataResponse } from './dto/component-date.response';

@Controller('components')
export class ComponentsController {

    constructor(private readonly componentService: ComponentsService) { }

    // GET
    @Get('/types')
    @UseGuards(AuthGuard('jwt'))
    public async types(): Promise<ComponentDataResponse> {
        const result = this.componentService.getTypes();
        return result;
    }

    //SET

}
