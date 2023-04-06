import { JwtGuard } from 'src/auth/guards';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { MovementsService } from './movements.service';
import { MovementDto } from './dto';
import { Movement } from './movements.model';
import { GetCustomer } from 'src/auth/decorators';

@UseGuards(JwtGuard)
@Controller('movements')
export class MovementsController {
  constructor(private movementService: MovementsService) {}

  @Post()
  create(
    @Body() dto: MovementDto,
    @GetCustomer('id') customerId: string,
  ): Promise<Movement> {
    return this.movementService.createMovement(dto, customerId);
  }

  @Get('warehouse/:id')
  getAllByWarehouse(@Param('id') id: string): Promise<Movement[]> {
    return this.movementService.getAllMovementsByWarehouseId(id);
  }
}
