import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class ErrorsService {
  test = (val: any) => {
    try {
      val.filter(() => true);
    } catch (error) {
      this.throwException(error);
    }
  };
  throwException = (exc: HttpException | any) => {
    if (exc instanceof HttpException) {
      throw exc;
    }
    const message = exc.errors ? exc.errors[0].message : 'something went wrong';
    throw new InternalServerErrorException([message]);
  };
}
