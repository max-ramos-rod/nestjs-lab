import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateRecadoDto } from './create-recado.dto';

export class UpdateRecadoDto extends PartialType(CreateRecadoDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  readonly texto?: string;
  @IsBoolean()
  @IsOptional()
  readonly lido?: boolean;
}
