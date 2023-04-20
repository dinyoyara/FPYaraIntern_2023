import { Controller, Get } from '@nestjs/common';
import { ErrorsService } from './errors.service';

@Controller('errors')
export class ErrorsController {
  constructor(private errorsService: ErrorsService) {}

  @Get('test')
  test() {
    return this.errorsService.test(2);
  }
}
