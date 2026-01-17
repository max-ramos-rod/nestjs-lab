import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Primeiro recado',
      de: 'Alice',
      para: 'Bob',
      lido: false,
      data: new Date(),
    },
  ];
  throwNotFoundException() {
    throw new NotFoundException('Recado não encontrado');
  }
  findAll(): Recado[] {
    return this.recados;
  }
  findeOne(id: string) {
    const recado = this.recados.find((item) => item.id === Number(id));
    if (recado) return recado;
    this.throwNotFoundException();
  }
  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const novoRecado = {
      id,
      ...body,
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.recados.push(novoRecado);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return novoRecado;
  }
  update(id: string, body: any): any {
    const index = this.recados.findIndex((item) => item.id === Number(id));

    if (index < 0) {
      this.throwNotFoundException();
    }
    const recadoSelecionado = this.recados[index];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.recados[index] = {
      ...recadoSelecionado,
      ...body,
    };
    return this.recados[index];
  }
  partialUpdate(id: string, body: any): any {
    return {
      id,
      ...body,
    };
  }
  remove(id: string) {
    const index = this.recados.findIndex((item) => item.id === Number(id));
    if (index < 0) {
      this.throwNotFoundException();
    }
    this.recados.splice(index, 1);

    return this.recados[index];
  }
}
