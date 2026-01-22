import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService,
  ) {}
  throwNotFoundException() {
    throw new NotFoundException('Recado não encontrado');
  }
  async findAll(paginationDto?: PaginationDto) {
    const { offset = 0, limit = 10 } = paginationDto || {};
    const recados = await this.recadoRepository.find({
      take: limit,
      skip: offset,
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    return recados;
  }
  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id: Number(id),
      },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          nome: true,
        },
        para: {
          id: true,
          nome: true,
        },
      },
    });
    if (recado) return recado;
    this.throwNotFoundException();
  }
  async create(createRecadoDto: CreateRecadoDto) {
    const { deId, paraId } = createRecadoDto;
    // Garantir que as pessoas "de" e "para" existam
    console.log('deId:', deId, 'paraId:', paraId);
    console.log('tipo de de', typeof deId, 'tipo de para:', typeof paraId);
    const de = await this.pessoasService.findOne(deId);
    const para = await this.pessoasService.findOne(paraId);
    console.log('Pessoa de:', de);
    console.log('Pessoa para:', para);
    if (!de || !para) {
      throw new NotFoundException('Pessoa "de" ou "para" não encontrada');
    }
    const novoRecado = {
      texto: createRecadoDto.texto,
      de: { id: de.id },
      para: { id: para.id },
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);
    return recado;
  }
  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const dadosRecado = {
      id,
      texto: updateRecadoDto.texto,
      lido: updateRecadoDto.lido,
      de: updateRecadoDto.deId ? { id: updateRecadoDto.deId } : undefined,
      para: updateRecadoDto.paraId ? { id: updateRecadoDto.paraId } : undefined,
    };
    console.log('Dados para update:', dadosRecado);
    console.log('ID do recado para update:', id, typeof id);
    const recado = await this.recadoRepository.preload(dadosRecado);
    console.log('Recado para update:', recado);
    if (!recado) return this.throwNotFoundException();
    await this.recadoRepository.save(recado);
    return recado;
  }

  async partialUpdate(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.findOne(id);

    if (!recado) {
      throw new NotFoundException(`Recado ${id} não encontrado`);
    }

    recado.texto = updateRecadoDto.texto ?? recado.texto;
    recado.lido = updateRecadoDto.lido ?? recado.lido;

    await this.recadoRepository.save(recado);
    return recado;
  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOneBy({
      id,
    });
    if (!recado) return this.throwNotFoundException();
    await this.recadoRepository.remove(recado);
    return recado;
  }
}
