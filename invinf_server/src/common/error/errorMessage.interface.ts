import { AppErrorTypeEnum } from './appErrorTypeEnum';
import { HttpStatus } from '@nestjs/common';
export interface IErrorMessage {
    type: AppErrorTypeEnum;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
}