import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { WarehousesService } from './warehouses.service';
import { Warehouse } from './warehouses.model';
import { CreateWarehouseDto } from './dto';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private warehousesService: WarehousesService) {}

  @Post()
  create(
    @Body() dto: CreateWarehouseDto,
    @GetUser('id') customerId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.createAsync(dto, customerId);
  }

  @Get()
  getAll(@GetUser('id') customerId: string): Promise<Warehouse[]> {
    return this.warehousesService.getAllByCustomerIdAsync(customerId);
  }
}
