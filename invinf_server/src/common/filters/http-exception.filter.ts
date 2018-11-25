import { ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(error: any, host: ArgumentsHost) {
        // Context
        const ctx = host.switchToHttp();
        // Request inside context
        const req = ctx.getRequest();
        // Response inside context
        const res = ctx.getResponse();

        if (error.getStatus() === HttpStatus.UNAUTHORIZED) {
            error.response['message'] = 'No tiene permisos para realizar la operació';
        }

        res.status(error.getStatus()).json({
            statusCode: error.getStatus(),
            error: error.name || error.response.name,
            message: error.message || error.response.message,
            errors: error.response.errors || null,
            timestamp: new Date().toISOString(),
            path: req ? req.url : null
        });
    }

}