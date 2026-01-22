import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { RecadosService } from 'src/recados/recados.service';
@Injectable()
export class AddHeaderInterceptor implements NestInterceptor {
  constructor(private readonly recadosService: RecadosService) {}
  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    console.log('AddHeaderInterceptor executado.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = context.switchToHttp().getResponse();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const recado = await this.recadosService.findOne(15);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.setHeader('X-Custom-Header', 'O valor do cabeçalho.');
    return next.handle();
  }
}
