import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import {
  MATH_API_PARAM_EXPR_NAME,
  MATH_API_PARAM_PRECISION_NAME,
  MATH_API_PARAM_PRECISION_VALUE,
  MATH_API_URL,
} from '../constants';

@Injectable()
export class MathService {
  constructor(private httpService: HttpService) {}

  calculateAsync = async (expr: string): Promise<number> => {
    const result = await firstValueFrom(
      this.httpService.get(MATH_API_URL, {
        params: {
          [MATH_API_PARAM_EXPR_NAME]: expr,
          //[MATH_API_PARAM_PRECISION_NAME]: MATH_API_PARAM_PRECISION_VALUE,
        },
      }),
    );
    return result.data;
  };
}
