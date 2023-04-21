import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { ProductDto } from './dto';
import { Product } from './products.model';
import { ErrorsService } from '../errors/errors.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    private errorsService: ErrorsService,
  ) {}

  createAsync = async (dto: ProductDto): Promise<Product> => {
    try {
      const product = await this.productModel.create({ ...dto });
      return product;
    } catch (error) {
      this.errorsService.throwException(error);
    }
  };

  getAllAsync = async (): Promise<Product[]> => {
    try {
      return this.productModel.findAll({
        attributes: ['id', 'name', 'size', 'type', 'price'],
      });
    } catch (error) {
      this.errorsService.throwException(error);
    }
  };

  getById = async (id: string): Promise<Product> => {
    return this.productModel.findByPk(id);
  };
}
