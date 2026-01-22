import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('ErrorHandlingInterceptor executado.');
    return next.handle().pipe(
      catchError(error => {
        return throwError(() => {
          if (error instanceof NotFoundException) {
            return new BadRequestException(error.message);
          }
        });
      }),
    );
  }
}
