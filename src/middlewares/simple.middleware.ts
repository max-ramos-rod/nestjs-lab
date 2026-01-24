// Cliente (Navegador) -> (Servidor) -> Middleware (Request, Response)

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// --> Nestjs(Guards, Interceptors, Pipes, Filters)
export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('SimpleMiddleware: Start');
    // Retorna um pagina não encontrada para roda definida no middleware.
    //return res.status(404).send({
    //  message: 'Não encontrado.',
    //});
    const authorization = req.headers?.authorization;
    if (authorization) {
      req['user'] = {
        nome: 'Maximilian',
        sobrenome: 'Ramos',
        role: 'Admin',
      };
    }
    // return next(); finaliza a função e nada mais é executado, como esperado
    // caso queira executar mais codigo apos o next deixe sem o return.
    next(); // Proximo middleware
    console.log('SimpleMiddleware: Finish');
    res.on('finish', () => {
      console.log('SimpleMiddleware: Conexão terminou.');
    });
  }
}
