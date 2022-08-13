import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EntityNotFoundExceptionFilter,
  HttpExceptionFilter,
} from './common/filters/http-exeception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { connectionOption } from './infrastructure/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOption), AppModule],
  providers: [
    {
      // Global Error Handler
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      // Not Found Entity Error Handler
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter,
    },
    {
      // Validation formatting response
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      // Output response using snakecase
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
})
export class AppModule { }
