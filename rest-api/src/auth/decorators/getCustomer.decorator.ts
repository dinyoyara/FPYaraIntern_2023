import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCustomer = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
