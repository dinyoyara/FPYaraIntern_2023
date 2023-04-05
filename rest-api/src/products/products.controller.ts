import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Product } from './products.model';

import { ProductsService } from './products.service';
import { ProductDto } from './dto';
import { JwtGuard } from 'src/auth/guards';

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
