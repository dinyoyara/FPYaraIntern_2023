import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const product = await this.productModel.create({ ...dto });
      return product;
    } catch (error) {
      throw new BadRequestException(error.errors[0].message);
    }
  };

  getAllAsync = async (): Promise<Product[]> => {
    return this.productModel.findAll({
      attributes: ['id', 'name', 'size', 'type', 'price'],
    });
  };

  getById = async (id: string): Promise<Product> => {
    return this.productModel.findByPk(id);
  };
}
