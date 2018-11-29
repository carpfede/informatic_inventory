import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { AreasModule } from './areas/areas.module';
import { ComponentsModule } from './components/components.module';
import { EquipesModule } from './equipes/equipes.module';
import { ProvidersModule } from './providers/providers.module';

@Module({
  imports: [UsersModule, EmployeesModule, AuthModule, AreasModule, ComponentsModule, EquipesModule, ProvidersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
