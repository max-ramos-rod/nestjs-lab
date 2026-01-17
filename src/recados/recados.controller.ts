import { Body, Controller, Get, Param, Post, Put, Patch, Delete } from '@nestjs/common';
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
  findAll() {
    return this.recadosService.findAll();
  }
  // Encontrar um recado pelo ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recadosService.findeOne(id);
  }
  @Post()
  create(@Body() createRecadoDto: CreateRecadoDto): CreateRecadoDto {
    return this.recadosService.create(createRecadoDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecadoDto: UpdateRecadoDto): UpdateRecadoDto {
    return this.recadosService.update(id, updateRecadoDto);
  }
  @Patch(':id')
  partialUpdate(
    @Param('id') id: string,
    @Body() updateRecadoDto: UpdateRecadoDto,
  ): UpdateRecadoDto {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.recadosService.partialUpdate(id, updateRecadoDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
  }
}
