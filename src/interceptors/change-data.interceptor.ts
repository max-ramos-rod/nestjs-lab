import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';
@Injectable()
export class ChangeDataInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    //console.log('ChangeDataInterceptor executado.');
    return next.handle().pipe(
      map(data => {
        if (Array.isArray(data)) {
          return {
            data,
            count: data.length,
          };
        }
      }),
    );
  }
}
