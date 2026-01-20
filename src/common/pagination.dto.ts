import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, Max } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(50) // Maximo 50 itens por página
  @Type(() => Number)
  limit?: number;
}
