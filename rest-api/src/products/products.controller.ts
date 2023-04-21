import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { ProductDto } from './dto';
import { Product } from './products.model';
import { JwtGuard } from '../auth/guards';
import { ProductsService } from './products.service';

@UseGuards(JwtGuard)
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() dto: ProductDto): Promise<Product> {
    return this.productsService.createAsync(dto);
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAllAsync();
  }
}
