import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnprocessableEntityException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof ForbiddenException) {
      console.log(exception.stack);
    } else if (exception instanceof UnprocessableEntityException) {
      const exceptionResponse = exception.getResponse();
      const data = exceptionResponse['data'] ?? null;

      response.status(status).json({
        message: exceptionResponse['message'],
        errors: data,
      });
      return;
    }

    response.status(status).json({
      message: exception.getResponse()['message'],
      errors: exception.getResponse()['error'],
    });
  }
}

@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 404;

    response.status(status).json({
      message: 'Data not found',
      data: null,
    });
  }
}
