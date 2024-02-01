import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { recursiveSearch } from '../../core/utils';
import { FastifyReply } from 'fastify'
import axios, { AxiosError } from 'axios';
import { ErrorHandlerResponse } from './error-handler.response';
import * as Sentry from '@sentry/node';
import { EntityNotFoundException } from '../../core/exceptions';
import { exec } from 'child_process';

@Catch(
  EntityNotFoundException,
  AxiosError
)
export class ErrorHandlerMiddleware implements ExceptionFilter{
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyReply>()
    const message = this.getMessage(exception);
    const code = this.getCode(exception);
    const name = exception.constructor.name;
    const show_error_metadata = request.headers['show_error_metadata'] === 'true';
    
    const error = {
      exception: name,
      message,
      code,
      metadata: show_error_metadata ? exception.metadata : undefined
    }

    if(!exception.is_business){
      error.code = 500;
      Sentry.captureException(exception);
    }

    reply.status(error.code).send({ status: 'error', error } as ErrorHandlerResponse)
  }

  private getMessage(exception: any): string{
    if(axios.isAxiosError(exception)){
      recursiveSearch(exception.response?.data, 'message') ?? exception.message;
    }

    return recursiveSearch(exception, 'message') ?? exception.message;
  }

  private getCode(exception: any): number {
    if(axios.isAxiosError(exception)){
      return exception.response?.status as number;
    }

    return recursiveSearch(exception, 'code') ?? 500;
  }
}