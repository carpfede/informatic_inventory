import { Module } from '@nestjs/common';
import { EquipesController } from './equipes.controller';
import { EquipesService } from './equipes.service';
import { ComponentsModule } from 'src/components/components.module';
import { ProvidersModule } from 'src/providers/providers.module';

@Module({
  controllers: [EquipesController],
  providers: [EquipesService],
  imports: [ComponentsModule, ProvidersModule]
})
export class EquipesModule { }
