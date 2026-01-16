import { Get, Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  @Get()
  getConceitosAutomaticos(): string {
    return 'Serviço de Conceitos Automático';
  }
}
