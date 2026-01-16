import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';

@Controller('recados')
export class RecadosController {
  // Encontrar todos os recados
  @Get()
  findAll(@Query() query: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { limit = 10, offset = 0 } = query;
    return (
      'Retornando todos os recados - ' + `limit: ${limit} - offset: ${offset}`
    );
  }
  // Encontrar um recado pelo ID
  @Get(':id/:dinamico')
  findOne(@Param('id') id: string, @Param('dinamico') dinamico: string) {
    return `Id do recado ${id} - dinamico adicionado: ${dinamico}`;
  }
  @Post()
  create(@Body() body: any) {
    console.log(body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return body;
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      id,
      ...body,
    };
  }
  @Patch(':id')
  partialUpdate(@Param('id') id: string, @Body() body: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      id,
      ...body,
    };
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `Recado ${id} removido com sucesso!`;
  }
}
