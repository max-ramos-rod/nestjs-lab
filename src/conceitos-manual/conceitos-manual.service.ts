import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosManualService {
  getConceitosManuais(): string {
    return 'Serviço de Conceitos Manual';
  }
}
