import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [EmployeesService],
  controllers: [EmployeesController],
  exports: [EmployeesService],
  imports: [UsersModule],
})
export class EmployeesModule { }