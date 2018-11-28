import { Module } from '@nestjs/common';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { ComponentsModule } from 'src/components/components.module';

@Module({
  controllers: [EquipesController],
  providers: [EquipesService],
  imports: [ComponentsModule]
})
export class EquipesModule { }
