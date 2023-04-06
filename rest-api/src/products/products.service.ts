import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Product } from './products.model';
import { ProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  createAsync = async (dto: ProductDto): Promise<Product> => {
    return this.productModel.create({ ...dto });
  };

  getAllAsync = async (): Promise<Product[]> => {
    return this.productModel.findAll({
      attributes: ['id', 'name', 'size', 'type', 'price'],
    });
  };
}
