import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

// CRUD - Create, Read, Update, Delete
// Create - POST -> Criar um recado
// Read - GET -> Encontrar recados
// Update - PUT/PATCH -> Modificar um recado
// Delete - DELETE -> Remover um recado

// DTO - Data Transfer Object - design pattern
// Usado para definir a estrutura dos dados que serão enviados em requisições
// DTO - objetos simples que definem como os dados serão enviados pela rede
// DTO no nestjs geralmente são implementados como classes ou interfaces TypeScript
// para validação e tipagem dos dados
// Transformar dados de entrada em objetos fortemente tipados e transformar tipos
// ou seja, validar, transformar e transportar dados entre processos

@Controller('recados')
export class RecadosController {
  constructor(private readonly recadosService: RecadosService) {}
  // Encontrar todos os recados
  @Get()
  async findAll() {
    return await this.recadosService.findAll();
  }
  // Encontrar um recado pelo ID
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.recadosService.findeOne(id);
  }
  @Post()
  async create(@Body() createRecadoDto: CreateRecadoDto) {
    return await this.recadosService.create(createRecadoDto);
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
    return await this.recadosService.update(id, updateRecadoDto);
  }
  @Patch(':id')
  async partialUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ) {
    return await this.recadosService.partialUpdate(id, updateRecadoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recadosService.remove(id);
  }
}
