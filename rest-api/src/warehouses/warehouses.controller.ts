import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { WarehousesService } from './warehouses.service';
import { Warehouse } from './warehouses.model';
import { WarehouseDto, WarehouseInfoDto } from './dto';
import { GetCustomer } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('warehouses')
export class WarehousesController {
  constructor(private warehousesService: WarehousesService) {}

  @Post()
  create(
    @Body() dto: WarehouseDto,
    @GetCustomer('id') customerId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.createAsync(dto, customerId);
  }

  @Get()
  getAll(@GetCustomer('id') customerId: string): Promise<WarehouseInfoDto[]> {
    return this.warehousesService.getAllByCustomerIdAsync(customerId);
  }

  @Put(':id')
  update(
    @Body() dto: WarehouseDto,
    @Param('id') id: string,
    @GetCustomer('id') customerId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.updateAsync(id, customerId, dto);
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @GetCustomer('id') customerId: string,
  ): Promise<Warehouse> {
    return this.warehousesService.deleteByIdAsync(id, customerId);
  }
}
