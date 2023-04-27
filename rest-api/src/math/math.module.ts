import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MathService } from './math.service';

@Module({
  imports: [HttpModule],
  providers: [MathService],
  exports: [MathService],
})
export class MathModule {}
