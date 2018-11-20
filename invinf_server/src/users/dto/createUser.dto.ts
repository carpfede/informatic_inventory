import { ApiModelProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CreateUserDto {
    @ApiModelProperty()
    readonly userName: string;

    @ApiModelProperty()
    readonly password: string;
}