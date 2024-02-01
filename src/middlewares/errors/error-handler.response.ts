export class ErrorHandlerResponse{
  status = 'error';
  error!: {
    exception: string;
    message: string;
    code: number;
    metadata?: { [key: string]: any }
  }
}