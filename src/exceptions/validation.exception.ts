import { HttpException, HttpStatus } from '@nestjs/common';


export class ValidationException extends HttpException {
  messages;

  constructor(response) {
    console.log(response)
    super(response, HttpStatus.BAD_REQUEST);
    this.messages = response;
  }
}
