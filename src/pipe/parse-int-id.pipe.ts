import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'param' || metadata.data !== 'id') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return value;
    }
    const parseValue = Number(value);
    if (isNaN(parseValue)) {
      throw new BadRequestException('ParseIntIdPipe espera uma string numerica de número inteiro.');
    }

    if (parseValue < 0) {
      throw new BadRequestException(
        'ParseIntIdPipe espera um valor maior que 0. Numero negativo não são aceitos.',
      );
    }
    return parseValue;
  }
}
