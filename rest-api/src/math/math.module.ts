import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MathService } from './math.service';

@Module({
  imports: [HttpModule],
  providers: [MathService],
  exports: [MathService],
})
export class MathModule {}
