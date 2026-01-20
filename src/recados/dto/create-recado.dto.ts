import { IsInt, IsString } from 'class-validator';

export class CreateRecadoDto {
  @IsInt()
  readonly deId: number;

  @IsInt()
  readonly paraId: number;

  @IsString()
  readonly texto: string;
}
