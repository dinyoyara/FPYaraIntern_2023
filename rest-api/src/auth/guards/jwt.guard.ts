import { AuthGuard } from '@nestjs/passport';

import { JWT_STRATEGY_NAME } from '../../constants';

export class JwtGuard extends AuthGuard(JWT_STRATEGY_NAME) {
  constructor() {
    super();
  }
}
