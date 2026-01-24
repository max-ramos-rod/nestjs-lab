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
  Query,
  Req,
} from '@nestjs/common';
import { RecadosService } from './recados.service';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { CreateRecadoDto } from './dto/create-recado.dto';
import express from 'express';

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
  async findAll(@Query() paginationDto: PaginationDto, @Req() req: express.Request) {
    console.log('RecadosController', req['user']);
    const recados = await this.recadosService.findAll(paginationDto);
    console.log(recados[0].id);
    return recados;
  }
  // Encontrar um recado pelo ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.recadosService.findOne(id);
  }
  @Post()
  async create(@Body() createRecadoDto: CreateRecadoDto) {
    return await this.recadosService.create(createRecadoDto);
  }
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRecadoDto: UpdateRecadoDto) {
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
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.recadosService.remove(id);
  }
}
