// src/filters/http-execption.filters.ts

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.OK;

    const message =
      exception?.message || exception?.toString() || 'Internal Server Error';
    response.status(status).json({
      code: 600, // 先用600 占个位
      message: message,
    });
  }
}
