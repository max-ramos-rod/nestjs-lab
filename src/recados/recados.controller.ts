import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { RecadosService } from './recados.service';

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
  create(@Body() body: any) {
    console.log(body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.recadosService.create(body);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.recadosService.update(id, body);
  }
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.recadosService.partialUpdate(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recadosService.remove(id);
  }
}
