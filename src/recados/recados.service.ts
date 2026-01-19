import { Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecadosService {
  constructor(
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
  ) {}
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
  async findAll() {
    const recados = await this.recadoRepository.find();
    return recados;
  }
  async findeOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id: Number(id),
      },
    });
    console.log(recado);
    if (recado) return recado;
    this.throwNotFoundException();
  }
  async create(createRecadoDto: CreateRecadoDto) {
    const novoRecado = {
      ...createRecadoDto,
      lido: false,
      data: new Date(),
    };
    const recado = this.recadoRepository.create(novoRecado);
    await this.recadoRepository.save(recado);
    return recado;
  }
  async update(id: number, updateRecadoDto: UpdateRecadoDto) {
    const recado = await this.recadoRepository.preload({
      id,
      ...updateRecadoDto,
    });
    if (!recado) return this.throwNotFoundException();
    await this.recadoRepository.save(recado);
    return recado;
  }
  async partialUpdate(id: number, updateRecadoDto: UpdateRecadoDto) {
    const partialUpdateRecadoDto = {
      lido: updateRecadoDto?.lido,
      texto: updateRecadoDto?.texto,
    };
    const recado = await this.recadoRepository.preload({
      id,
      ...partialUpdateRecadoDto,
    });
    if (!recado) return this.throwNotFoundException();
    Object.assign(recado, partialUpdateRecadoDto);
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
