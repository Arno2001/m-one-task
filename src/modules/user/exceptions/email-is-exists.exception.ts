import { ConflictException } from '@nestjs/common';

export class EmailIsExistsException extends ConflictException {
  constructor() {
    super('Email Is Already Exsist');
  }
}
