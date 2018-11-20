import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule],
  providers: [EmployeesService],
  controllers: [EmployeesController],
  exports: [
    EmployeesService,
    MongooseModule,
  ],
})
export class EmployeesModule { }