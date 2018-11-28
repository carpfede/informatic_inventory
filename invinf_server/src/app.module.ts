import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { AreasModule } from './areas/areas.module';

@Module({
  imports: [UsersModule, EmployeesModule, AuthModule, AreasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
