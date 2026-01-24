import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = context.getResponse();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.getRequest();
    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =
      typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as object);
    console.log(statusCode, exceptionResponse);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    response.status(statusCode).json({
      ...error,
      data: new Date().toISOString(),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      path: request.url,
    });
  }
}
