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

import { JwtGuard } from '../auth/guards';
import { Warehouse } from './warehouses.model';
import { GetCustomer } from '../auth/decorators';
import { ProductInfoModel } from '../products/models';
import { WarehouseDto, WarehouseInfoDto } from './dto';
import { WarehousesService } from './warehouses.service';

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

  @Get(':id')
  getOneWithProducts(@Param('id') id: string): Promise<ProductInfoModel[]> {
    return this.warehousesService.getWarehouseProducts(id);
  }
}
