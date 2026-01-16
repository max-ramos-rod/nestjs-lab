import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello World!</h1>';
  }
  getHello1(): string {
    return '<h1>Agora vamos nessa.</h1>';
  }
}
