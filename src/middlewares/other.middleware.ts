import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// --> Nestjs(Guards, Interceptors, Pipes, Filters)
export class OtherMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('OtherMiddleware: Estamos rodando.');
    next();
    console.log('OtherMiddleware: Bye Bye.');
  }
}
