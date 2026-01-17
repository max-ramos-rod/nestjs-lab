import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

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
    const recado = this.recados.find(item => item.id === Number(id));
    if (recado) return recado;
    this.throwNotFoundException();
  }
  create(createRecadoDto: CreateRecadoDto): Recado {
    this.lastId++;
    const id = this.lastId;
    const novoRecado: Recado = {
      id,
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    this.recados.push(novoRecado);
    return novoRecado;
  }
  update(id: string, updateRecadoDto: UpdateRecadoDto): Recado {
    const index = this.recados.findIndex(item => item.id === Number(id));

    if (index < 0) {
      this.throwNotFoundException();
    }
    const recadoSelecionado = this.recados[index];
    this.recados[index] = {
      ...recadoSelecionado,
      ...updateRecadoDto,
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
    const index = this.recados.findIndex(item => item.id === Number(id));
    if (index < 0) {
      this.throwNotFoundException();
    }
    this.recados.splice(index, 1);

    return this.recados[index];
  }
}
